<template>
  <div class="choice-container">
    <!-- 左侧导航 -->
    <div class="outline">
      <h3>章节导航</h3>
      <ul>
        <li v-for="chapter in chapters" 
            :key="chapter.id"
            @click="scrollToChapter(chapter.id)"
            :class="{ active: currentChapter === chapter.id }">
          {{ chapter.title }}
        </li>
      </ul>
    </div>

    <!-- 右侧内容 -->
    <div class="content">
      <div v-for="chapter in chapters" 
           :key="chapter.id" 
           :id="chapter.id"
           class="chapter">
        <h2>{{ chapter.title }}</h2>
        
        <div v-for="question in chapter.questions" 
             :key="question.id"
             class="question-card">
          <!-- 题目标题（可点击展开/收起） -->
          <div class="question-header" @click="toggleQuestion(question)">
            <span class="toggle-icon">{{ question.isVisible ? '▼' : '▶' }}</span>
            <strong>{{ question.id }}. {{ question.content }}</strong>
          </div>
          
          <!-- 题目内容 -->
          <div v-show="question.isVisible" class="question-content">
            <!-- 选项 -->
            <div class="options">
              <div v-for="(option, key) in question.options" 
                   :key="key"
                   class="option">
                {{ key }}. {{ option }}
              </div>
            </div>
            
            <!-- 答案区域 -->
            <div class="answer-section">
              <button @click="toggleAnswer(question)">
                {{ question.showAnswer ? '隐藏答案' : '显示答案' }}
              </button>
              <span v-if="question.showAnswer" class="answer">
                答案：{{ question.answer }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { parseQuestions } from '../utils/parseQuestions';

// 章节数据
const chapters = ref([]);
const currentChapter = ref('');

// 从文件加载题目内容
const loadQuestions = async () => {
  try {
    const response = await fetch('/src/files/JAVAEE选择题.md');
    const markdown = await response.text();
    chapters.value = parseQuestions(markdown);
    if (chapters.value.length > 0) {
      currentChapter.value = chapters.value[0].id;
    }
  } catch (error) {
    console.error('加载题目失败:', error);
  }
};

// 滚动到指定章节
const scrollToChapter = (chapterId) => {
  const element = document.getElementById(chapterId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    currentChapter.value = chapterId;
  }
};

// 切换题目显示/隐藏
const toggleQuestion = (question) => {
  question.isVisible = !question.isVisible;
};

// 切换答案显示/隐藏
const toggleAnswer = (question) => {
  question.showAnswer = !question.showAnswer;
};

// 组件挂载时加载题目
onMounted(() => {
  loadQuestions();
});
</script>

<style scoped>
.choice-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.outline {
  width: 200px;
  position: sticky;
  top: 20px;
  height: fit-content;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.outline ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.outline li {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin: 4px 0;
  transition: all 0.3s ease;
}

.outline li:hover {
  background: #e0e0e0;
}

.outline li.active {
  background: #42b983;
  color: white;
}

.content {
  flex: 1;
  max-width: 800px;
}

.chapter {
  margin-bottom: 30px;
}

.question-card {
  margin: 15px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.question-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
}

.question-header:hover {
  background: #f5f5f5;
  border-radius: 4px;
}

.toggle-icon {
  font-size: 12px;
  color: #666;
}

.question-content {
  margin-top: 15px;
  padding-left: 25px;
}

.options {
  margin: 10px 0;
}

.option {
  margin: 8px 0;
  padding: 5px 10px;
}

.answer-section {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.answer-section button {
  background: #42b983;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.answer-section button:hover {
  background: #3aa876;
}

.answer {
  color: #42b983;
  font-weight: bold;
}

@media (max-width: 768px) {
  .choice-container {
    flex-direction: column;
  }
  
  .outline {
    width: 100%;
    position: static;
  }
}
</style> 