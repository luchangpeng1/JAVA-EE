export function parseQuestions(markdown) {
  const chapters = [];
  let currentChapter = null;
  
  // 按行分割内容
  const lines = markdown.split('\n');
  
  let currentQuestion = null;
  
  lines.forEach(line => {
    // 匹配章节标题
    const chapterMatch = line.match(/^# (.+)/);
    if (chapterMatch && chapterMatch[1].includes('第')) {
      currentChapter = {
        id: `chapter${chapters.length + 1}`,
        title: chapterMatch[1],
        questions: []
      };
      chapters.push(currentChapter);
      return;
    }
    
    // 匹配题目
    const questionMatch = line.match(/^\*\*(\d+)\. (.+)\*\*/);
    if (questionMatch && currentChapter) {
      currentQuestion = {
        id: questionMatch[1],
        content: questionMatch[2],
        options: {},
        answer: '',
        isVisible: true,
        showAnswer: false
      };
      currentChapter.questions.push(currentQuestion);
      return;
    }
    
    // 匹配选项
    const optionMatch = line.match(/^([A-D])\. (.+)/);
    if (optionMatch && currentQuestion) {
      currentQuestion.options[optionMatch[1]] = optionMatch[2];
      return;
    }
    
    // 匹配答案
    const answerMatch = line.match(/^\*\*答案：([A-D])\*\*/);
    if (answerMatch && currentQuestion) {
      currentQuestion.answer = answerMatch[1];
    }
  });
  
  return chapters;
} 