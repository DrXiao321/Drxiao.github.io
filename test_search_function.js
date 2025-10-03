// 测试招聘者职位搜索功能
const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testSearchFunction() {
  console.log('=== 测试招聘者职位搜索功能 ===\n');
  
  try {
    // 1. 登录获取token
    console.log('1. 登录获取token...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test_employer@example.com',
      password: '123456'
    });
    
    const token = loginResponse.data.token;
    console.log('登录成功，token获取成功');
    
    // 2. 测试按职位名称搜索
    console.log('\n2. 测试按职位名称搜索（搜索"前端"）...');
    const searchByTitleResponse = await axios.get(`${API_BASE}/jobs/company?title=前端`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('按职位名称搜索结果:');
    console.log('成功:', searchByTitleResponse.data.success);
    console.log('数量:', searchByTitleResponse.data.count);
    console.log('总数量:', searchByTitleResponse.data.total);
    console.log('当前页:', searchByTitleResponse.data.page);
    console.log('总页数:', searchByTitleResponse.data.pages);
    
    if (searchByTitleResponse.data.data && searchByTitleResponse.data.data.length > 0) {
      console.log('搜索结果职位:');
      searchByTitleResponse.data.data.forEach(job => {
        console.log(`- ${job.title} (${job.location})`);
      });
    }
    
    // 3. 测试按工作地点搜索
    console.log('\n3. 测试按工作地点搜索（搜索"北京"）...');
    const searchByLocationResponse = await axios.get(`${API_BASE}/jobs/company?location=北京`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('按工作地点搜索结果:');
    console.log('成功:', searchByLocationResponse.data.success);
    console.log('数量:', searchByLocationResponse.data.count);
    
    if (searchByLocationResponse.data.data && searchByLocationResponse.data.data.length > 0) {
      console.log('搜索结果职位:');
      searchByLocationResponse.data.data.forEach(job => {
        console.log(`- ${job.title} (${job.location})`);
      });
    }
    
    // 4. 测试按工作类型搜索
    console.log('\n4. 测试按工作类型搜索（搜索"全职"）...');
    const searchByJobTypeResponse = await axios.get(`${API_BASE}/jobs/company?jobType=全职`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('按工作类型搜索结果:');
    console.log('成功:', searchByJobTypeResponse.data.success);
    console.log('数量:', searchByJobTypeResponse.data.count);
    
    // 5. 测试组合搜索
    console.log('\n5. 测试组合搜索（职位名称包含"前端"且工作地点包含"北京"）...');
    const combinedSearchResponse = await axios.get(`${API_BASE}/jobs/company?title=前端&location=北京`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('组合搜索结果:');
    console.log('成功:', combinedSearchResponse.data.success);
    console.log('数量:', combinedSearchResponse.data.count);
    
    if (combinedSearchResponse.data.data && combinedSearchResponse.data.data.length > 0) {
      console.log('搜索结果职位:');
      combinedSearchResponse.data.data.forEach(job => {
        console.log(`- ${job.title} (${job.location}) - ${job.jobType}`);
      });
    }
    
    // 6. 测试空搜索（返回所有职位）
    console.log('\n6. 测试空搜索（返回所有职位）...');
    const emptySearchResponse = await axios.get(`${API_BASE}/jobs/company`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('空搜索结果:');
    console.log('成功:', emptySearchResponse.data.success);
    console.log('数量:', emptySearchResponse.data.count);
    console.log('总数量:', emptySearchResponse.data.total);
    
    console.log('\n=== 搜索功能测试完成 ===');
    
  } catch (error) {
    console.error('测试失败:', error.response?.data || error.message);
  }
}

// 运行测试
testSearchFunction();