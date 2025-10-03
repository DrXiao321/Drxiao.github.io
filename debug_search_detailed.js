// 详细调试搜索功能
const axios = require('axios');

async function debugSearchDetailed() {
  console.log('=== 详细调试搜索功能 ===\n');
  
  try {
    // 1. 测试简单搜索
    console.log('1. 测试简单搜索 "前端"...');
    const search1 = await axios.get('http://localhost:5000/api/jobs?search=前端');
    console.log('结果数量:', search1.data.count);
    console.log('查询参数:', search1.config.url);
    
    // 2. 测试完整职位名称搜索
    console.log('\n2. 测试完整职位名称 "前端开发工程师"...');
    const search2 = await axios.get('http://localhost:5000/api/jobs?search=前端开发工程师');
    console.log('结果数量:', search2.data.count);
    
    // 3. 测试地点搜索
    console.log('\n3. 测试地点搜索 "北京"...');
    const search3 = await axios.get('http://localhost:5000/api/jobs?search=北京');
    console.log('结果数量:', search3.data.count);
    
    // 4. 测试公司名称搜索
    console.log('\n4. 测试公司名称搜索 "测试招聘公司"...');
    const search4 = await axios.get('http://localhost:5000/api/jobs?search=测试招聘公司');
    console.log('结果数量:', search4.data.count);
    
    // 5. 获取所有职位数据进行分析
    console.log('\n5. 分析所有职位数据...');
    const allJobs = await axios.get('http://localhost:5000/api/jobs');
    console.log('总职位数:', allJobs.data.count);
    
    const jobs = allJobs.data.data;
    console.log('职位标题列表:');
    jobs.forEach(job => {
      console.log(`- "${job.title}" (${job.location}) - ${job.company?.name || job.company}`);
    });
    
    // 6. 检查前端开发工程师职位的详细信息
    const frontendJob = jobs.find(job => job.title.includes('前端'));
    if (frontendJob) {
      console.log('\n6. 前端开发工程师职位详情:');
      console.log('标题:', frontendJob.title);
      console.log('描述:', frontendJob.description);
      console.log('地点:', frontendJob.location);
      console.log('公司:', frontendJob.company?.name || frontendJob.company);
    }
    
    console.log('\n=== 详细调试完成 ===');
    
  } catch (error) {
    console.error('调试失败:', error.response?.data || error.message);
  }
}

debugSearchDetailed();