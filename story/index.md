# language: zh-CN
功能: 客户选择商品,创建订单
  背景:
    假如有如下租户:
      | ID      | Name  |
      | 10002   | 兰图科技  |
      | 1000001 | 测试租户1 |
      | 1000002 | 测试租户2 |
    并且有如下服务商
      | TenantID | 10002 |
    假如有集成专家
      | Name  | TenantID | UserID | IsLogin | IsAdmin | Role      |
      | Bob   | 10002    | 1      | true    | true    | admin     |
      | John  | 10002    | 2      | true    | true    | admin     |
      | Alice | 1000001  | 3      | true    | true    | admin     |
      | Tom   | 1000001  | 4      | true    | false   | developer |
      | Emily | 1000002  | 5      | true    | true    | admin     |
    假如服务商有如下解决方案
      | Solution  | Desc  | Owner | Developer |
      | solution1 | 解决方案1 | Bob   | Alice     |
    假如解决方案的版本如下
      | Solution  | VersionNO |
      | solution1 | 1.0.0     |
      | solution1 | 2.0.0     |

    当Bob创建了如下商品
      | Name | Category | Tag | Summary | Cover | DetailDesc | UseAgreementURL | PrivacyPolicyURL |
      | 商品1 | 所属类别 | 所属标签 | 商品简介 | 封面图 | 介绍（图文） | 使用协议网址 | 隐私协议网址 |
      | 商品2 | 所属类别2 | 所属标签2 | 商品简介2 | 封面图2 | 介绍（图文2） | 使用协议网址2 | 隐私协议网址2 |

    并且Bob编辑权益包基本信息,方案信息
      | ProductName | SKUName | SKUDesc | SKUGray | SKUPrice | Solution  | SolutionVersion | Guidance | Type             | AvailableTime | InstanceLimit |
      | 商品1         | 权益包1    | 权益包描述   | false   | 100      | solution1 | 1.0.0           | 使用指导     | project          |               |               |
      | 商品1         | 权益包2    | 权益包描述   | false   | 0        | solution1 | 1.0.0           | 使用指导     | solutionInstance | 1年8月12天       | 10            |
      | 商品1         | 权益包3    | 权益包描述   | true    | 999      | solution1 | 2.0.0           | 使用指导     | solutionInstance | 1年8月12天       | 100           |
      | 商品1         | 权益包4    | 权益包描述   | true    | 999      | solution1 | 2.0.0           | 使用指导     | project          |               |               |
      | 商品2         | 权益包1    | 权益包描述   | true    | 999      | solution1 | 1.0.0           | 使用指导     | solutionInstance | 1年8月12天       | 10            |

    并且Bob上架商品
      | ProductName |
      | 商品1         |
      | 商品2         |
    并且Bob修改权益包灰度租户列表
      | ProductName | SKUName | GrayTenantID |
      | 商品1         | 权益包3    | 1000001      |
      | 商品1         | 权益包4    | 1000002      |
      | 商品2         | 权益包1    | 1000001      |


  场景: 未登录客户可以在方案中心浏览商品列表,可以看到已全量方案
    假如Alice未登入
    当Alice浏览方案中心
    那么Alice可以查看到的商品列表如下
      | Name | Cover | Category | Provider |
      | 商品1  | 封面图   | 所属类别     | 兰图科技     |
    当Alice获取"商品1"详情,将返回
      | Name | Category | Tag  | Summary | Cover | DetailDesc | Provider |
      | 商品1  | 所属类别     | 所属标签 | 商品简介    | 封面图   | 介绍（图文）     | 兰图科技     |
    当Alice获取"商品1"权益包,将返回
      | SKUName | SKUDesc | SKUGray | SKUPrice | Solution  | SolutionVersion | Guidance | Type             | AvailableTime | InstanceLimit |
      | 权益包1    | 权益包描述   | false   | 100      | solution1 | 1.0.0           | 使用指导     | project          |               |               |
      | 权益包2    | 权益包描述   | false   | 0        | solution1 | 1.0.0           | 使用指导     | solutionInstance | 1年8月12天       | 10            |


  场景: 已登录客户可以在方案中心浏览商品列表,可以看到已全量方案和被灰度方案，和已全量权益包和被灰度权益包
    假如Alice已登入
    当Alice浏览方案中心
    那么Alice可以查看到的商品列表如下
      | Name | Cover | Category | Provider |
      | 商品1  | 封面图   | 所属类别     | 兰图科技     |
      | 商品2  | 封面图2  | 所属类别2    | 兰图科技     |
    当Alice获取"商品1"详情,将返回
      | Name | Category | Tag  | Summary | Cover | DetailDesc | Provider |
      | 商品1  | 所属类别     | 所属标签 | 商品简介    | 封面图   | 介绍（图文）     | 兰图科技     |
    当Alice获取"商品1"权益包,将返回
      | SKUName | SKUDesc | SKUGray | SKUPrice | Solution  | SolutionVersion | Guidance | Type             | AvailableTime | InstanceLimit |
      | 权益包1    | 权益包描述   | false   | 100      | solution1 | 1.0.0           | 使用指导     | project          |               |               |
      | 权益包2    | 权益包描述   | false   | 0        | solution1 | 1.0.0           | 使用指导     | solutionInstance | 1年8月12天       | 10            |
      | 权益包3    | 权益包描述   | true    | 999      | solution1 | 2.0.0           | 使用指导     | solutionInstance | 1年8月12天       | 100             |
    当Alice获取"商品2"详情,将返回
      | Name | Category | Tag   | Summary | Cover | DetailDesc | Provider |
      | 商品2  | 所属类别2    | 所属标签2 | 商品简介2   | 封面图2  | 介绍（图文2     | 兰图科技     |
    当Alice获取"商品2"权益包,将返回
      | SKUName | SKUDesc | SKUGray | SKUPrice | Solution  | SolutionVersion | Guidance | Type    | AvailableTime | InstanceLimit |
      | 权益包1    | 权益包描述   | true    | 999      | solution1 | 1.0.0           | 使用指导     | project |               |               |


  场景: 商品下的任一「已启用、待停用、停用审核中」的权益包对某个租户可见时，该租户可以在列表中看到此商品
    假如Alice已登入
    当Alice浏览方案中心
    那么Alice可以查看到的商品列表如下
      | Name | Cover | Category | Provider |
      | 商品1  | 封面图   | 所属类别     | 兰图科技     |
      | 商品2  | 封面图2  | 所属类别2    | 兰图科技     |
    当Bob停用"商品2"权益包
      | SKUName |
      | 权益包1    |
    当Alice浏览方案中心
    那么Alice可以查看到的商品列表如下
      | Name | Cover | Category | Provider |
      | 商品1  | 封面图   | 所属类别     | 兰图科技     |
      | 商品2  | 封面图2  | 所属类别2    | 兰图科技     |
    并且Bob上架"商品2"
    当Alice浏览方案中心
    那么Alice可以查看到的商品列表如下
      | Name | Cover | Category | Provider |
      | 商品1  | 封面图   | 所属类别     | 兰图科技     |
    当Bob编辑"商品2"权益包基本信息,方案信息
      | SKUName | SKUDesc | SKUGray | SKUPrice | Solution  | SolutionVersion | Guidance | Type    | AvailableTime | InstanceLimit |
      | 权益包2    | 权益包描述   | false   | 999      | solution1 | 1.0.0           | 使用指导     | project |               |               |
    当Alice浏览方案中心
    那么Alice可以查看到的商品列表如下
      | Name | Cover | Category | Provider |
      | 商品1  | 封面图   | 所属类别     | 兰图科技     |

  场景: 已登录客户可以选择一套商品权益创建订单,创建订单后,客户管理员可以查看已创建的订单
    假如Tom已登入
    假如Tom选择"商品1"的权益包"权益包1"创建订单
    那么管理员Alice查看订单列表将返回
      | OrderNum | SKUName | Type    | AvailableTime | InstanceLimit | Price | Provider | Status | Creator | CreateTime |
      | 1        | 商品1     | project |               |               | 100   | 兰图科技     | 待确认    | Tom     |            |
    当管理员Alice查看"订单1"详情将返回
      | OrderNum | SKUName | Type    | AvailableTime | InstanceLimit | Price | Provider | Status | Creator | CreateTime |
      | 1        | 商品1     | project |               |               | 100   | 兰图科技     | 待确认    | Tom     |            |
    

  场景: 已登录客户可以选择一套商品权益创建订单，创建订单后,商品创建人接收到订单创建通知,服务商可以查看已创建的订单
    假如Tom已登入
    并且Tom选择"商品1"的权益包"权益包3"创建订单
    那么Bob将接收到"订单1"创建通知
    当John查看订单列表,将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Customer | Status   |CreateTime |
      | 1        | 商品1     | solutionInstance | 1年8月12天       | 100           | 999   | 测试租户1    | 待确认         |            |
    当John查看"订单1"详情,将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Customer | Status | CreateTime |
      | 1        | 商品1     | solutionInstance | 1年8月12天       | 100           | 999   | 测试租户1    | 待确认    |            |

  场景: 已登录客户可以选择一套商品权益创建订单,创建订单后,服务商可以修改和确认订单
    假如Tom已登入
    并且Tom选择"商品1"的权益包"权益包3"创建订单
    当Bob查看订单列表,将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Customer | Status  | CreateTime |
      | 1        | 商品1     | solutionInstance | 1年8月12天       | 100           | 999   | 测试租户1    | 待确认         |            |
    当Bob查看"订单1"详情,将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Customer | Status  | CreateTime |
      | 1        | 商品1     | solutionInstance | 1年8月12天       | 100           | 999   | 测试租户1    | 待确认         |            |
    当Bob修改"订单1"
      | AvailableTime | InstanceLimit | Price | Customer | Status | CreateTime |
      | 2年8月12天       | 1000          | 8888  | 测试租户1    | 待确认    |            |
    当Bob查看"订单1"详情,将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Customer | Status | CreateTime |
      | 1        | 商品1     | solutionInstance | 2年8月12天       | 1000          | 8888  | 测试租户1    | 待确认    |            |
    当管理员Alice查看"订单1"详情将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Provider | Status | Creator | CreateTime |
      | 1        | 商品1     | solutionInstance | 2年8月12天       | 1000          | 8888  | 兰图科技     | 待确认    | Tom     |            |
    当Bob确认"订单1"
    当Bob查看"订单1"详情,将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Customer | Status | CreateTime |
      | 1        | 商品1     | solutionInstance | 2年8月12天       | 1000          | 8888  | 测试租户1    | 已生效    |            |
    那么Tom将收到订单已生效消息通知
    当管理员Alice查看"订单1"详情将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Provider | Status | Creator | CreateTime |
      | 1        | 商品1     | solutionInstance | 2年8月12天       | 1000          | 8888  | 兰图科技     | 已生效    | Tom     |            |


  场景: 已登录客户可以选择一套0元商品权益创建订，创建订单自动确认
    假如Tom已登入
    当Tom选择"商品1"的权益包"权益包2"创建订单
    那么Tom将收到"订单1"单已生效消息通知
    那么管理员Alice查看订单列表将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Provider | Status | Creator | CreateTime |
      | 1        | 商品1     | solutionInstance | 1年8月12天       | 10            | 0     | 兰图科技     | 已生效    | Tom     |            |
    那么Bob将接收到"订单1"创建通知
    当Bob查看订单列表,将返回
      | OrderNum | SKUName | Type             | AvailableTime | InstanceLimit | Price | Customer | Status | CreateTime |
      | 1        | 商品1     | solutionInstance | 1年8月12天       | 10            | 0     | 测试租户1    | 已生效    |            |

    
  场景: 已登录客户对于同一个商品只能创建一个订单
    假如Tom已登入
    假如Tom选择"商品1"的权益包"权益包1"创建订单
    那么Tom创建"商品1"的权益包"权益包1"创建订单成功
    当Tom选择"商品1"的权益包"权益包1"创建订单
    那么Tom选择"商品1"的权益包"权益包1"创建订单失败
    当Tom选择"商品1"的权益包"权益包2"创建订单
    那么Tom选择"商品1"的权益包"权益包2"创建订单失败
    
    