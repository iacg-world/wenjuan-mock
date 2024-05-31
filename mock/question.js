const Mock = require('mockjs')
const getQuestionList = require('./data/getQuestionList')
const getComponentList = require('./data/getComponentList')
const axios = require('axios');
const backgroundApi='https://api.btstu.cn/sjbz/api.php?lx=dongman&format=json&method=mobile'

const Random = Mock.Random

module.exports = [
    {
        // 获取单个问卷信息
        url: '/api/question/:id',
        method: 'get',
        async response() {
            try {
                const res = await axios.get(backgroundApi, {
                    headers: {'Content-Type': 'axios'},
                    
                })
                return {
                    errno: 0,
                    data: {
                        id: Random.id(),
                        title: Random.ctitle(),
                        background: res.data.imgurl,
                        desc: '问卷描述',
                        js: '',
                        css: '',
                        isDeleted: false,
                        isPublished: true,
                        componentList: getComponentList()
                    }
    
                    // errno: 1002,
                    // msg: '错误测试'
                }
            } catch (error) {
                return {
                    errno: 1002,
                    msg: error
                }
            }
        }
    },
    {
        // 创建问卷
        url: '/api/question',
        method: 'post',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id()
                }
            }
        }
    },
    {
        // 获取（查询）问卷列表
        url: '/api/question',
        method: 'get',
        response(ctx) {
            const { url = '', query = {} } = ctx
            const isDeleted = url.indexOf('isDeleted=true') >= 0
            const isStar = url.indexOf('isStar=true') >= 0
            const pageSize = parseInt(query.pageSize) || 10

            return {
                errno: 0,
                data: {
                    list: getQuestionList({ len: pageSize, isDeleted, isStar }), // 当前页
                    total: 100 // 总数，用于分页
                }
            }
        }
    },
    {
        // 更新问卷
        url: '/api/question/:id',
        method: 'patch',
        response() {
            return {
                errno: 0
            }
        }
    },
    {
        // 复制问卷
        url: '/api/question/duplicate/:id',
        method: 'post',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id()
                }
            }
        }
    },
    {
        // 批量彻底删除
        url: '/api/question',
        method: 'delete',
        response() {
            return {
                errno: 0
            }
        }
    }
]