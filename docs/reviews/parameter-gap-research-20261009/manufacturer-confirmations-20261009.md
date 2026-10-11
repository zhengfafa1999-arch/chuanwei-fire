# 用户新增确认：干式材质与HS/HSW压力

日期：2026-10-09。本地修改，未部署，PDF不变。

- 干式喷头：用户确认“不锈钢”。英阿主规格由材质选型确认改为Stainless steel；匹配阿里档案中的不锈钢框架、溅水盘和延长管写入原配置。未添加304/316牌号或全零件不锈钢声明。材质冲突已解决，旧证据保留。
- HS直通/斜式阀、HSW横向手轮阀：用户回复“1.6和2.5压力都有”。主规格显示1.6 MPa / 16 bar与2.5 MPa / 25 bar两档工作压力；按所选型号和接口确认档位，没有扩大为每个型号都能选两档。未推导试验压力、法兰标准或材质。
- 水流指示器：常规参考值来自联塑ZSJZ产品页的DC24V、0.5A触点容量和常开/常闭输出；Potter不同型号额定值不同。触点电气额定值和供电电压是不同字段，未把同类值写成冠亚参数。需要本型号微动开关标识或接线/规格资料。

原确认见dry-material-confirmation.json与landing-valve-pressure-confirmation.json；电气候选和参考来源见waterflow-electrical-reference.json。构建使用`npm --ignore-scripts run build`。
