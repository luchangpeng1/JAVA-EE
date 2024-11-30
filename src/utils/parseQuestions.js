export function parseQuestions(text) {
  const chapters = [];
  let currentChapter = null;
  let currentQuestion = null;
  
  // 按行分割文本
  const lines = text.split('\n').map(line => line.trim());
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 跳过空行和分隔符
    if (!line || line === '---') continue;
    
    // 匹配章节标题
    if (line.startsWith('第') && line.includes('章')) {
      currentChapter = {
        id: `chapter${chapters.length + 1}`,
        title: line,
        questions: []
      };
      chapters.push(currentChapter);
      continue;
    }
    
    // 匹配题目
    const questionMatch = line.match(/^(\d+)\. (.+)/);
    if (questionMatch && currentChapter) {
      currentQuestion = {
        id: questionMatch[1],
        content: questionMatch[2],
        options: {},
        answer: '',
        isVisible: false,
        showAnswer: false
      };
      currentChapter.questions.push(currentQuestion);
      continue;
    }
    
    // 匹配选项
    const optionMatch = line.match(/^([A-D])\. (.+)/);
    if (optionMatch && currentQuestion) {
      currentQuestion.options[optionMatch[1]] = optionMatch[2];
      continue;
    }
    
    // 匹配答案
    const answerMatch = line.match(/^答案：\s*([A-D])/);
    if (answerMatch && currentQuestion) {
      currentQuestion.answer = answerMatch[1];
    }
  }
  
  return chapters;
} 