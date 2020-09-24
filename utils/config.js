   /**
    * 小程序配置文件
    */
   //线上
const host = 'http://pico.imwork.net:21372'

   const config = {
     // 引导页地址，获取引导页内容 
     postGetGuidancePage: host + '/index/getGuidancePage',

     // 用户登录地址，用于获取会员ID和登录令牌，判断用户是否为会员，进行页面跳转
     postLogin: host + '/member/postLogin',

     //用户注册页面获取短信验证码地址，用于获取短信验证码
     postSms: host + '/member/postSms',

     //注册地址， 用于用户注册为会员
     postRegister: host + '/member/postRegister',

     //查询设备号地址，用于查询设备号是否存在

     postIMEIUrl: host + '/device/postIMEI',

     // 关注设备地址，用于关注设备

     postFollowUrl: host + '/device/postFollow',

     // 绑定地址，用于绑定设备

     postBindingUrl: host + '/device/postBinding',

     //首页轮播图地址，用于获取轮播图片

     postGetCarousel: host + '/index/getCarousel',

     //首页公告地址，用于获取轮播公告

     postGetNotice: host + '/index/getNotice',

     //首页资讯热点地址，用于获取资讯热点

     postGetHotNews: host + '/index/getHotNews',

     //首页圈子地址，用于获取分享圈子内容

     postGetGroupNews: host + '/index/getGroupNews',

     //健康页地址，用于获取健康首页内容

     postGetHealthData: host + '/device/getHealthData',

     //健康页默认数据地址，用于获取健康首页内容

     postGetDefaultHealthData: host + '/device/getDefaultHealthData',

     //健康页一键测量地址，用于获取一键测量数据

     postPostMeasure: host + '/device/postMeasure',

     //我的家人地址，用于查询会员的家人列表

     postGetMyAllFamily: host + '/member/getMyAllFamily',

     //健康数据详情地址，用于获取血压或血糖等数据详情

     postGetHealthDetail: host + '/device/getHealthDetail',

     //获取七天日期地址，用于在数据详情页切换日期

     postGetSevenDate: host + '/device/getSevenDate',

     //更多页地址，用于获取更多页页面数据（进入即获取）

     getMyPage: host + '/consult/member/getMyPage',

     //个人信息地址，用于获取用户个人信息

     postGetSimpleInfo: host + '/member/getSimpleInfo',

     //修改个人信息地址，用于修改用户个人信息

     postMyInfo: host + '/member/postMyInfo',

     //身份认证地址，用于身份实名认证

     postCertification: host + '/member/postCertification',

     //个人信息明细地址，用于获取个人详细信息

     postGetPersonalDetailData: host + '/member/getPersonalDetailData',

     //我的家人单个家人信息地址，用于获取该会员具体家人的信息

     postGetMyFamilyInfo: host + '/member/getMyFamilyInfo',

     // 转让设备地址，用于转让设备管理权

     postTransfer: host + '/device/postTransfer',

     // 设备解绑地址，用于解绑设备管理权

     postRemove: host + '/device/postRemove',
     //取消关注地址，用于取消关注

     postUnbinding: host + '/member/postUnbinding',

     //医疗记录地址，用于获取用户病史报告单病历卡等信息

     postGetMedicalRecord: host + '/member/getMedicalRecord',

     //新建医疗记录地址，用于用户新建医疗记录

     postAddMedicalRecord: host + '/member/postAddMedicalRecord',
     //删除医疗记录地址，用于用删除医疗记录

     postDeleteMedicalRecord: host + '/member/postDeleteMedicalRecord',

     //获取设备信息地址，用于获取设备信息

     postGetDeviceInfo: host + '/device/getDeviceInfo',

     //获取关注设备的人地址，用于成员管理数据

     postGetDeviceFollower: host + '/member/getDeviceFollower',

     //添加成员地址，用于成员管理页面添加成员

     postAddFollower: host + '/member/postAddFollower',

     //远程设置获取联系人地址，用于获取联系人列表或者SOS联系人列表

     postGetDistanceLinkman: host + '/device/getDistanceLinkman',

     //远程设置修改联系人地址，用于修改联系人列表或者SOS联系人列表

     postModLinkman: host + '/device/postModLinkman',

     //远程设置修改联系人地址，用于修改联系人列表或者SOS联系人列表

     postDeleteLinkman: host + '/device/postDeleteLinkman',

     //远程设置添加联系人地址，用于添加联系人列表或者SOS联系人列表

     postAddLinkman: host + '/device/postAddLinkman',

     //远程设置获取定时任务地址，获取定时任务（定时提醒、定时测量）

     postGetDistanceClock: host + '/device/getDistanceClock',

     //获取单个定时任务地址，获取定时任务（定时提醒、定时测量）

     postGetSingleDistanceClock: host + '/device/getSingleDistanceClock',

     //修改定时任务地址，修改定时任务（定时提醒、定时测量）

     postModClock: host + '/device/postModClock',
     //删除定时任务地址，删除定时任务（定时提醒、定时测量）

     postDeleteClock: host + '/device/postDeleteClock',

     //添加定时任务地址，添加定时任务（定时提醒、定时测量）

     postAddClock: host + '/device/postAddClock',

     //上传录音，修改或添加定时任务（定时提醒）

     postUploadVoiceForAlarm: host + '/index/uploadVoiceForAlarm',

     //上传录音，语音聊天

     postUpload: host + '/index/uploadVoice',
     //我的星币地址，获取我的星币页面内容

     postGetMyStartCoinInfo: host + '/member/getMyStartCoinInfo',

     //关于我们地址，获取关于我们页面内容

     postGetGoldnetInfo: host + '/index/getGoldnetInfo',

     //邀请好友地址，获取邀请好友页面内容

     postGetInvitationData: host + '/member/getInvitationData',


     //反馈地址

     postHelp: host + '/member/postHelp',


     //通知提醒地址，获取通知提醒内容

     postGetAdvice: host + '/device/getAdvice',

     //系统公告地址，获取系统公告内容

     postMemberGetNotice: host + '/index/getNotice',

     //获取定位信息地址，获取当前定位信息

     postGetCurLocation: host + '/device/getCurLocation',

     //获取定位信息地址，获取当前默认定位信息

     postGetDefaultLocationInfo: host + '/device/getDefaultLocationInfo',
     //获取轨迹信息地址，获取当前轨迹信息

     postgetRangeLocation: host + '/device/getRangeLocation',

     //设备立即定位指令下发地址，获取当前定位信息

     postLocation: host + '/device/postLocation',

     //设备指令，设置工作模式 
     postSetDeviceWorkPattern: host + '/device/postSetDeviceWorkPattern',

     //获取当前设备工作模式 
     postQueryWorkPattern: host + '/device/queryWorkPattern',

     //设备指令，设置定位频率 
     postSetDeviceLocationFrequency: host + '/device/postSetDeviceLocationFrequency',

     //设备指令，远程关机
     postShutdown: host + '/device/postShutdown',

     //设备指令，远程重启
     postReboot: host + '/device/postReboot',

     //校准血压
     postCalibrationBP: host + '/device/postCalibrationBP',

     //资讯详情
     postGetSingleNews: host + '/index/getSingleNews',

     //流水号查指令下发情况
     postSerial: host + '/device/postSerial',

     //获取聊天记录地址
     postQueryAllVoice: host + '/device/postQueryAllVoice',

     //  获取医生信息（医生主页）
     getDoctorInfo: host + '/doctor/getDoctorInfo',
     //  首页获取推荐专家
     getHotDoctor: host + '/home/getHotDoctor',
     //  首页获取八个热门科室
     getEightSectionList: host + '/home/getEightSectionList',
     //  获取轮播图
     getCarousel: host + '/home/getCarousel',
     //  获取问诊会话列表
     getAllConsult: host + '/consult/getAllConsult',
     // 获取医生（专家）列表
     getDoctorList: host + '/doctor/getDoctorList',
     // 根据不同类型获取订单
     getOrderByType: host + '/order/getOrderByType',
     // 获取所有跟医生相关的评论
     getDoctorComment: host + '/comment/getDoctorComment',
     // 提交评论
     postComment: host + '/comment/postComment',
     // 取消订单
     postCancelOrder: host + '/order/postCancelOrder',

     // 获取我的家人列表
     getMyFamily: host + '/family/getMyFamily',
     // 获取家人的基本信息（包括自己）
     getFamilyBaseInfo: host + '/family/getFamilyBaseInfo',
     // 提交家人的基本信息（包括自己）
     postFamilyBaseInfo: host + '/family/postFamilyBaseInfo',
     // 获取家人健康信息（包括自己）
     getFamilyHealthInfo: host + '/family/getFamilyHealthInfo',
     //提交修改家人健康信息
     postFamilyHealthInfo: host + '/family/postFamilyHealthInfo',
     //获取病历
     getMedicalRecord: host + '/archive/getMedicalRecord',
     //获取处方单
     getPrescription: host + '/archive/getPrescription',
     //获取单个病历
     getSingleMedicalRecord: host + '/archive/getSingleMedicalRecord',
     //获取单个处方
     getSinglePrescription: host + '/archive/getSinglePrescription',
     //获取我的评论
     getMyComment: host + '/comment/getMyComment',

     //获取单个问诊的会话明细
     getSingleConsultDetail: host + '/consult/getSingleConsultDetail',
     //结束问诊
     postCutOffConsult: host + '/consult/postCutOffConsult',
     //获取医生的问诊价格
     getDoctorService: host + '/doctor/getDoctorService',
     //提交问诊（提交病历、下订单）
     postInquiry: host + '/consult/postInquiry',
     //获取我的家人列表
     getMyFamily: host + '/family/getMyFamily',
     //添加家人（病人）
     postAddFamily: host + '/family/postAddFamily',
     //获取状况种类
     getSelectorParams: host + '/search/getSelectorParams',
     //获取平台公告
     getYiHaoNotice: host + '/home/getYiHaoNotice',
     //精品推荐
     getHotGoods: host + '/home/getHotGoods',
     //绑定设备
     postBindingNew: host + '/device/postBindingNew',
     //获取科室
     getSection: host + '/search/getSection',
     //获取国内省市区街道
     getRegionJson: host + '/search/getRegionJson',
     //接口名称:首页获取推荐专家
     getHotDoctor: host + '/home/getHotDoctor',
   }

   module.exports = config