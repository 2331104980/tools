select nodeoperator,requestid,max(flowtime) as max_flowtime,min(flowtime) as min_flowTime,
avg(flowtime) as avg_flowtime
from v_workflow_node_max --,v_workflow_node_min b,v_workflow_node_avg c
group by nodeoperator,requestid