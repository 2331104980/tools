/**
 *apollo 客户端
 */

import * as request from 'request';
import * as fs from 'fs';
import * as path from 'path';

// enum NameSpaceType {
//     properties = "",
//     xml = "xml",
//     json = "json",
//     yml = "yml",
//     yaml = "yaml",
//     txt = "txt"
// }
// enum FetchType {
//     fetchFromCache = 1,  //读取缓存
//     fetchWithoutCache = 2 //不从缓存读取
// }

export class ApolloClient {
    constructor() {

    }

    private releaseKey: string = ``;
    private static apolloClient: ApolloClient = null;

    /**
     * 获取ApolloClient实例
     * @returns apolloClient实例
     */
    public static getApolloClient(): ApolloClient {
        if (!this.apolloClient) {
            this.apolloClient = new ApolloClient();
        }
        return this.apolloClient;
    }


    /**
     * 获取配置(带缓存)
     *  {config_server_url}/configfiles/json/{appId}/{clusterName}/{namespaceName}?ip={clientIp}
     * @param config_server_url 
     * @param appId 
     * @param clusterName 
     * @param namespaceName 
     * @param clientIp ip 如果不需要,querystring不要拼接上ip
     * @param protocol http协议 http||https 默认http
     * @returns 
     */
    public fetchConfigWithCache(config_server_url: string, appId: number, clusterName: string = "default", namespaceName: Array<String> = ["application"], clientIp: string): any {
        return [];
    }

    /**
     * 获取配置(不带缓存)
     * {config_server_url}/configs/{appId}/{clusterName}/{namespaceName}?releaseKey={releaseKey}&ip={clientIp}
     * @param config_server_url 
     * @param appId 
     * @param clusterName 集群名	
     * @param namespaceName 如果没有新建过Namespace的话，传入application即可。 如果创建了Namespace，并且需要使用该Namespace的配置，则传入对应的Namespace名字。需要注意的是对于properties类型的namespace，只需要传入namespace的名字即可，如application。对于其它类型的namespace，需要传入namespace的名字加上后缀名，如datasources.json
     * @param releaseKey 将上一次返回对象中的releaseKey传入即可，用来给服务端比较版本，如果版本比下来没有变化，则服务端直接返回304以节省流量和运算
     * @param clientIp ip 如果不需要,querystring不要拼接上ip
     * @param protocol http协议 http||https 默认http
     * @param fileDir 从本地读取
     */
    public async fetchConfigWithoutCache(config_server_url: string, appId: number, clusterName: string = "default", namespaceName: string = "application", clientIp: string): Promise<any> {
        const ipQueryStr = clientIp ? `&ip=${clientIp}` : "";
        const options = {
            method: 'GET',
            url: `${config_server_url}/configs/${appId}/${clusterName}/${namespaceName}?releaseKey=${this.releaseKey}}${ipQueryStr}`,
        }
        let configs = await this.httpRequest(options);
        //根据类型提取config信息
        if (!configs?.configurations) {
            return null;
        }
        if (configs.configurations.content) {
            //存储到本地文件
            return configs.configurations.content;
        }
        return configs.configurations;
    }

    public async fetchConfig(url) {
        const options = {
            method: 'GET',
            url
        }
        let configs = await this.httpRequest(options);
        //根据类型提取config信息
        if (!configs?.configurations) {
            return null;
        }
        if (configs.configurations.content) {
            //存储到本地文件
            return configs.configurations.content;
        }
        if (configs.releaseKey) {
            this.releaseKey = configs.releaseKey;
        }
        return configs.configurations;
    }

    /**
     * 刷新本地存储
     * @param configs {filePath,config}
     * @param fileDir 本地存储路径
     */
    private reflashLocalStorage(configs: any, dirPath: string) {
        if (!fs.existsSync(dirPath)) {
            //用户给的目录不存在，创建默认目录
            dirPath = path.join(__dirname, './apolloconfig')
            fs.mkdirSync(dirPath)
        }
        //本地文件持久化
        fs.writeFileSync(`${dirPath}/config`, configs)
        // fs.writeFile(`${dirPath}/config`, configs, (error) => {
        //     if (error) {
        //         console.log(`===============初始化配置写入本地文件失败===============`)
        //         console.log(error)
        //     } else {
        //         console.log(`本地文件更新成功`, dirPath)
        //     }
        // })
    }



    /**
     * 读取本地配置文件(应用程序重启如果网络异常会读取本地配置)
     * @param appId 
     * @param clusterName 
     * @param namespaceName 
     * @param clientIp 
     * @param fileDir 
     */
    private getConfigFromLocalStorage(fileDir: string) {
        const filePath = `${fileDir}/config`;
        if (!fs.existsSync(filePath)) {
            return null;
        }
        let configsStr = fs.readFileSync(filePath).toString();
        return configsStr;
    }

    public async initConfig(url: string, currentConfig: any, options: any) {
        let configs = await this.fetchConfig(url);
        const { dirPath } = options;

        if (!configs) {
            //拉取配置失败，读取本地配置问价
            configs = await this.getConfigFromLocalStorage(options.dirPath);
            if (!configs) {
                //获取
                throw new Error("fail to get the config");
            }
        }

        //刷新本地缓存
        await this.reflashLocalStorage(configs, dirPath)

        let configsObj = JSON.parse(configs)
        console.log(`===============成功获取配置，开始启动app===============`)
        console.log(configs)
        Object.assign(currentConfig, configsObj, currentConfig);
        console.log(currentConfig)
        return configsObj;
    }

    /**
     * 刷新配置
     * @param config_server_url 
     * @param appId 
     * @param clusterName 
     * @param namespaceName 
     * @param clientIp 
     * @param currentConfig 
     * @param options 
     */
    private async refreshConfig(url, currentConfig, options) {
        const { dirPath } = options;
        //刷新配置
        // let configs = await this.fetchConfigWithoutCache(config_server_url, appId, clusterName, namespaceName, clientIp);
        let configs = await this.fetchConfig(url);
        if (configs) {
            this.reflashLocalStorage(configs, dirPath)
            const configsObj = JSON.parse(configs)
            console.log(`===============刷新配置===============`)
            Object.assign(currentConfig, configsObj, currentConfig);
            console.log(currentConfig)
        }
    }

    /**
     * 
     * @param config_server_url 
     * @param appId 
     * @param clusterName 
     * @param namespaceName 
     * @param clientIp 
     * @param options {fileDir,clientIp,config}
     * @param currentConfig 当前系统最新配置
     */
    public async start(url: string, currentConfig: any, options: any) {
        const { timeout = 60000 } = options;
        //初始化配置，初始化不成功抛出异常
        await this.initConfig(url, currentConfig, options)

        setInterval(async () => {
            //定时调用API刷新配置
            this.refreshConfig(url, currentConfig, options)
        }, timeout)

    }

    /**
     * http客户端请求
     * @param options
     * @returns 
     */
    private httpRequest(options): any {
        return new Promise((resolve, reject) => {
            request(options, (error: any, data: any) => {
                if (error) {
                    console.log(`=========请求失败·==========`)
                    console.log(error)
                    resolve(null);
                } else {
                    resolve(JSON.parse(data.body))
                }
            })
        });
    }
}

// let c = ApolloClient.getApolloClient()//xml.xml  //, '/Users/snail/Downloads/code/tools/log'
// c.fetchConfigWithoutCache('http://pc.vanelink:8080', 4001, 'default', 'json.json', '').then(data => {
//     console.log(data)
// })
// c.start('http://pc.vanelink:8080', 4001, 'default', 'json.json', '', {}, {})