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
      <!-- 添加加载状态显示 -->
      <div v-if="loading" class="loading">
        加载中...
      </div>
      
      <!-- 添加错误信息显示 -->
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      
      <!-- 题目内容 -->
      <div v-else>
        <div v-for="chapter in chapters" 
             :key="chapter.id" 
             :id="chapter.id"
             class="chapter">
          <h2>{{ chapter.title }}</h2>
          
          <div v-for="question in chapter.questions" 
               :key="question.id"
               class="question-card">
            <div class="question-header" @click="toggleQuestion(question)">
              <span class="toggle-icon">{{ question.isVisible ? '▼' : '▶' }}</span>
              <strong>{{ question.id }}. {{ question.content }}</strong>
            </div>
            
            <div v-show="question.isVisible" class="question-content">
              <div class="options">
                <div v-for="(option, key) in question.options" 
                     :key="key"
                     class="option">
                  {{ key }}. {{ option }}
                </div>
              </div>
              
              <div class="answer-section">
                <button @click.stop="toggleAnswer(question)">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { parseQuestions } from '../utils/parseQuestions';
import { loadQuestionsData } from '../data/questions';

const chapters = ref([]);
const currentChapter = ref('');
const loading = ref(true);
const error = ref(null);

const loadQuestions = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    console.log('开始加载题目...');
    const data = await loadQuestionsData();
    console.log('题目数据加载完成，长度:', data?.length);
    
    if (!data) {
      throw new Error('没有加载到题目数据');
    }
    
    const parsedChapters = parseQuestions(data);
    console.log('解析后的章节数:', parsedChapters?.length);
    console.log('解析后的章节:', parsedChapters);
    
    chapters.value = parsedChapters;
    
    if (!chapters.value || chapters.value.length === 0) {
      throw new Error('解析题目数据失败');
    }

    // 初始化问题状态
    chapters.value.forEach((chapter, idx) => {
      console.log(`章节 ${idx + 1}:`, chapter.title);
      console.log(`题目数量:`, chapter.questions.length);
      chapter.questions.forEach(question => {
        question.isVisible = false;
        question.showAnswer = false;
      });
    });

    if (chapters.value.length > 0) {
      currentChapter.value = chapters.value[0].id;
    }
  } catch (err) {
    console.error('加载题目失败:', err);
    error.value = err.message;
  } finally {
    loading.value = false;
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

// 只需要调用一次 loadQuestions
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
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 15px 0;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.question-header {
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.question-header:hover {
  background-color: #f5f5f5;
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
  margin: 15px 0;
  padding-left: 20px;
}

.option {
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
}

.option:hover {
  background-color: #f8f8f8;
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

/* 添加新样式 */
.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #ff4444;
  background: #ffeeee;
  border-radius: 8px;
  margin: 20px 0;
}
</style> 