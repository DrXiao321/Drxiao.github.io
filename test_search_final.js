// 最终测试搜索功能
const axios = require('axios');

async function testSearchFinal() {
  console.log('=== 最终测试搜索功能 ===\n');
  
  try {
    // 1. 测试搜索"前端"
    console.log('1. 测试搜索"前端"...');
    const search1 = await axios.get('http://localhost:5000/api/jobs?search=前端');
    console.log('结果数量:', search1.data.count);
    console.log('数据:', search1.data.data.length > 0 ? search1.data.data.map(j => j.title) : '无结果');
    
    // 2. 测试搜索"北京"
    console.log('\n2. 测试搜索"北京"...');
    const search2 = await axios.get('http://localhost:5000/api/jobs?search=北京');
    console.log('结果数量:', search2.data.count);
    console.log('数据:', search2.data.data.length > 0 ? search2.data.data.map(j => j.title) : '无结果');
    
    // 3. 测试搜索"前端开发工程师"
    console.log('\n3. 测试搜索"前端开发工程师"...');
    const search3 = await axios.get('http://localhost:5000/api/jobs?search=前端开发工程师');
    console.log('结果数量:', search3.data.count);
    console.log('数据:', search3.data.data.length > 0 ? search3.data.data.map(j => j.title) : '无结果');
    
    // 4. 获取所有职位验证数据存在
    console.log('\n4. 验证所有职位数据...');
    const allJobs = await axios.get('http://localhost:5000/api/jobs');
    console.log('总职位数:', allJobs.data.count);
    
    const frontendJobs = allJobs.data.data.filter(job => 
      job.title.includes('前端') || 
      job.location.includes('北京')
    );
    
    console.log('包含"前端"或"北京"的职位:');
    frontendJobs.forEach(job => {
      console.log(`- ${job.title} (${job.location})`);
    });
    
    console.log('\n=== 测试完成 ===');
    
  } catch (error) {
    console.error('测试失败:', error.response?.data || error.message);
  }
}

testSearchFinal();