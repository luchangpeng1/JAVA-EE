// 使用相对路径加载题目数据
export async function loadQuestionsData() {
  try {
    // 修改为正确的路径，基于你的项目部署位置
    
    const response = await fetch('./public/data/questions.txt');
    if (!response.ok) {
      console.error('HTTP Error:', response.status, response.statusText);
      throw new Error(`Failed to load questions: ${response.status}`);
    }
    const data = await response.text();
    if (!data) {
      console.error('Empty response data');
      throw new Error('No data received');
    }
    // 添加更多调试信息
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Loaded data length:', data.length);
    console.log('First 100 characters:', data.substring(0, 100));
    return data;
  } catch (error) {
    console.error('Error loading questions:', error);
    throw error;
  }
} 