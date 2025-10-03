// 调试搜索功能
const axios = require('axios');

async function debugSearch() {
  console.log('=== 调试搜索功能 ===\n');
  
  try {
    // 1. 获取所有职位
    console.log('1. 获取所有职位...');
    const allJobs = await axios.get('http://localhost:5000/api/jobs');
    console.log('总职位数:', allJobs.data.count);
    
    // 2. 查找包含"前端"的职位
    const frontendJobs = allJobs.data.data.filter(job => 
      job.title.includes('前端') || 
      job.description.includes('前端') ||
      job.location.includes('前端')
    );
    
    console.log('包含"前端"的职位数量:', frontendJobs.length);
    frontendJobs.forEach(job => {
      console.log(`- ${job.title} (${job.location})`);
      console.log('  描述:', job.description);
    });
    
    // 3. 测试搜索API
    console.log('\n2. 测试搜索API...');
    const searchResponse = await axios.get('http://localhost:5000/api/jobs?search=前端');
    console.log('搜索API结果:');
    console.log('成功:', searchResponse.data.success);
    console.log('数量:', searchResponse.data.count);
    
    if (searchResponse.data.data && searchResponse.data.data.length > 0) {
      console.log('搜索结果:');
      searchResponse.data.data.forEach(job => {
        console.log(`- ${job.title} (${job.location})`);
      });
    } else {
      console.log('没有搜索结果');
    }
    
    // 4. 测试搜索"北京"
    console.log('\n3. 测试搜索"北京"...');
    const beijingResponse = await axios.get('http://localhost:5000/api/jobs?search=北京');
    console.log('搜索北京结果:');
    console.log('数量:', beijingResponse.data.count);
    
    if (beijingResponse.data.data && beijingResponse.data.data.length > 0) {
      console.log('搜索结果:');
      beijingResponse.data.data.forEach(job => {
        console.log(`- ${job.title} (${job.location})`);
      });
    }
    
    console.log('\n=== 调试完成 ===');
    
  } catch (error) {
    console.error('调试失败:', error.response?.data || error.message);
  }
}

debugSearch();