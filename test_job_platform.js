// 测试就业服务站求职招聘平台
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testJobPlatform() {
  console.log('=== 开始测试就业服务站求职招聘平台 ===\n');
  
  try {
    // 1. 注册测试招聘者账号
    console.log('1. 注册测试招聘者账号...');
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, {
      email: 'test_employer@example.com',
      password: '123456',
      role: '招聘者',
      name: '测试招聘公司'
    });
    
    console.log('注册结果:', registerResponse.data);
    
    // 2. 登录获取token
    console.log('\n2. 登录获取token...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test_employer@example.com',
      password: '123456'
    });
    
    const token = loginResponse.data.token;
    console.log('登录成功，token获取成功');
    
    // 3. 创建职位
    console.log('\n3. 创建测试职位...');
    const jobData = {
      title: '前端开发工程师',
      location: '北京',
      salary: {
        min: 15,
        max: 25,
        unit: '月'
      },
      jobType: '全职',
      experience: '1-3年',
      education: '本科',
      description: '负责前端开发工作',
      requirements: '熟悉Vue.js, React等前端框架',
      skills: ['JavaScript', 'Vue.js', 'React'],
      benefits: ['五险一金', '带薪年假', '定期体检']
    };
    
    const createJobResponse = await axios.post(`${API_BASE}/jobs`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('职位创建结果:', createJobResponse.data);
    
    // 4. 测试招聘者职位列表
    console.log('\n4. 测试招聘者职位列表...');
    const companyJobsResponse = await axios.get(`${API_BASE}/jobs/company`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('招聘者职位列表:', companyJobsResponse.data);
    
    // 5. 测试公开职位列表
    console.log('\n5. 测试公开职位列表...');
    const publicJobsResponse = await axios.get(`${API_BASE}/jobs`);
    console.log('公开职位列表:', publicJobsResponse.data);
    
    console.log('\n=== 测试完成 ===');
    
  } catch (error) {
    console.error('测试失败:', error.response?.data || error.message);
  }
}

// 运行测试
testJobPlatform();