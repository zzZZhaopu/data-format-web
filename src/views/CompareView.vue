<template>
  <div class="compare-view">
    <!-- 页面头部 -->
    <div class="page-header fade-in">
      <h2 class="page-title">差异对比</h2>
      <p class="page-description">智能对比两段文本或数据的差异，支持多种格式的智能对比分析</p>
    </div>

    <!-- 主要功能区域 -->
    <div class="compare-container slide-up">
      <el-card>
        <template #header>
          <div class="section-header">
            <el-icon :size="18" color="#409eff">
              <DocumentCopy />
            </el-icon>
            <span class="section-title">文本对比工具</span>
            <div class="header-actions">
              <el-button size="small" @click="clearContent">
                <el-icon><Delete /></el-icon>
                清空
              </el-button>
              <el-button type="primary" size="small" @click="performCompare">
                <el-icon><Search /></el-icon>
                开始对比
              </el-button>
            </div>
          </div>
        </template>
        
        <!-- 输入区域 -->
        <div class="input-section">
          <el-row :gutter="16">
            <el-col :span="12">
              <div class="input-wrapper">
                <div class="input-label">
                  <el-icon :size="16" color="#409eff">
                    <Document />
                  </el-icon>
                  <span>原始内容</span>
                  <el-badge :value="leftContent.length" :max="9999" type="info" />
                </div>
                <el-input
                  v-model="leftContent"
                  type="textarea"
                  :rows="12"
                  placeholder="请输入原始文本内容..."
                  class="compare-textarea"
                />
              </div>
            </el-col>
            <el-col :span="12">
              <div class="input-wrapper">
                <div class="input-label">
                  <el-icon :size="16" color="#67c23a">
                    <DocumentChecked />
                  </el-icon>
                  <span>对比内容</span>
                  <el-badge :value="rightContent.length" :max="9999" type="success" />
                </div>
                <el-input
                  v-model="rightContent"
                  type="textarea"
                  :rows="12"
                  placeholder="请输入要对比的文本内容..."
                  class="compare-textarea"
                />
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 对比选项 -->
        <div class="options-section mt-16">
          <div class="options-header">
            <el-icon :size="16" color="#e6a23c">
              <Setting />
            </el-icon>
            <span class="options-title">对比选项</span>
          </div>
          <div class="options-content">
            <el-space wrap :size="16">
              <el-checkbox v-model="options.ignoreCase">忽略大小写</el-checkbox>
              <el-checkbox v-model="options.ignoreWhitespace">忽略空白字符</el-checkbox>
              <el-checkbox v-model="options.showLineNumbers">显示行号</el-checkbox>
              <el-select v-model="compareType" size="small" style="width: 120px">
                <el-option label="文本对比" value="text" />
                <el-option label="JSON对比" value="json" />
                <el-option label="XML对比" value="xml" />
              </el-select>
            </el-space>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 结果展示区域 -->
    <div class="result-section mt-24 slide-up" v-if="showResult">
      <el-card>
        <template #header>
          <div class="result-header">
            <el-icon :size="18" color="#67c23a">
              <CircleCheck />
            </el-icon>
            <span class="result-title">对比结果</span>
            <div class="result-stats">
              <el-tag size="small" type="success">相同: {{ resultStats.same }}</el-tag>
              <el-tag size="small" type="warning">修改: {{ resultStats.modified }}</el-tag>
              <el-tag size="small" type="danger">删除: {{ resultStats.deleted }}</el-tag>
              <el-tag size="small" type="info">新增: {{ resultStats.added }}</el-tag>
            </div>
          </div>
        </template>
        
        <div class="result-content">
          <div class="placeholder-result">
            <el-icon :size="48" color="#409eff">
              <SuccessFilled />
            </el-icon>
            <h4>对比完成</h4>
            <p>差异对比功能正在开发中，将支持高亮显示差异内容</p>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 快速对比模板 -->
    <div class="templates-section mt-24 slide-up">
      <el-card>
        <template #header>
          <div class="section-header">
            <el-icon :size="18" color="#e6a23c">
              <Collection />
            </el-icon>
            <span class="section-title">快速对比模板</span>
          </div>
        </template>
        
        <div class="templates-content">
          <el-row :gutter="12">
            <el-col :xs="24" :sm="12" :md="6">
              <el-button 
                class="template-btn" 
                @click="useTemplate('json')"
                plain
              >
                <el-icon><DocumentChecked /></el-icon>
                JSON数据对比
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <el-button 
                class="template-btn" 
                @click="useTemplate('code')"
                plain
              >
                <el-icon><EditPen /></el-icon>
                代码差异对比
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <el-button 
                class="template-btn" 
                @click="useTemplate('url')"
                plain
              >
                <el-icon><Link /></el-icon>
                URL参数对比
              </el-button>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6">
              <el-button 
                class="template-btn" 
                @click="useTemplate('config')"
                plain
              >
                <el-icon><Setting /></el-icon>
                配置文件对比
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { 
  DocumentCopy, 
  Document, 
  DocumentChecked, 
  Setting,
  Search,
  Delete,
  CircleCheck,
  SuccessFilled,
  Collection,
  EditPen,
  Link
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 响应式数据
const leftContent = ref('')
const rightContent = ref('')
const compareType = ref('text')
const showResult = ref(false)

const options = reactive({
  ignoreCase: false,
  ignoreWhitespace: false,
  showLineNumbers: true
})

const resultStats = reactive({
  same: 0,
  modified: 0,
  deleted: 0,
  added: 0
})

/**
 * 执行对比操作
 */
const performCompare = () => {
  if (!leftContent.value.trim() || !rightContent.value.trim()) {
    ElMessage.warning('请输入要对比的内容')
    return
  }
  
  ElMessage.success('开始对比分析...')
  showResult.value = true
  
  // 模拟统计数据
  resultStats.same = 15
  resultStats.modified = 3
  resultStats.deleted = 2
  resultStats.added = 5
}

/**
 * 清空内容
 */
const clearContent = () => {
  leftContent.value = ''
  rightContent.value = ''
  showResult.value = false
  ElMessage.info('已清空所有内容')
}

/**
 * 使用模板
 */
const useTemplate = (type) => {
  const templates = {
    json: {
      left: '{\n  "name": "张三",\n  "age": 25,\n  "city": "北京"\n}',
      right: '{\n  "name": "张三",\n  "age": 26,\n  "city": "上海"\n}'
    },
    code: {
      left: 'function hello() {\n  console.log("Hello World");\n}',
      right: 'function hello() {\n  console.log("Hello Vue!");\n  return true;\n}'
    },
    url: {
      left: 'https://api.example.com?name=张三&age=25',
      right: 'https://api.example.com?name=张三&age=26&city=上海'
    },
    config: {
      left: 'server:\n  host: localhost\n  port: 3000',
      right: 'server:\n  host: 0.0.0.0\n  port: 8080\n  ssl: true'
    }
  }
  
  const template = templates[type]
  if (template) {
    leftContent.value = template.left
    rightContent.value = template.right
    ElMessage.success(`已加载${type}对比模板`)
  }
}
</script>

<style lang="scss" scoped>
.compare-view {
  .page-header {
    text-align: center;
    margin-bottom: 32px;
    
    .page-title {
      font-size: 28px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      margin: 0 0 8px 0;
    }
    
    .page-description {
      font-size: 16px;
      color: var(--el-text-color-regular);
      margin: 0;
    }
  }
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      flex: 1;
    }
    
    .header-actions {
      display: flex;
      gap: 8px;
    }
  }
  
  .input-section {
    .input-wrapper {
      .input-label {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 500;
        color: var(--el-text-color-regular);
      }
      
      .compare-textarea {
        :deep(.el-textarea__inner) {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
        }
      }
    }
  }
  
  .options-section {
    padding: 16px;
    background: var(--el-bg-color-page);
    border-radius: 6px;
    
    .options-header {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 12px;
      
      .options-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--el-text-color-regular);
      }
    }
  }
  
  .result-section {
    .result-header {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .result-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--el-text-color-primary);
        flex: 1;
      }
      
      .result-stats {
        display: flex;
        gap: 8px;
      }
    }
    
    .result-content {
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .placeholder-result {
        text-align: center;
        
        h4 {
          font-size: 18px;
          font-weight: 600;
          color: var(--el-text-color-primary);
          margin: 12px 0 8px 0;
        }
        
        p {
          font-size: 14px;
          color: var(--el-text-color-regular);
          margin: 0;
        }
      }
    }
  }
  
  .templates-section {
    .templates-content {
      .template-btn {
        width: 100%;
        height: 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        border: 1px solid var(--el-border-color);
        
        &:hover {
          border-color: var(--el-color-primary);
          color: var(--el-color-primary);
        }
        
        .el-icon {
          font-size: 18px;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .compare-view {
    .page-header {
      margin-bottom: 24px;
      
      .page-title {
        font-size: 24px;
      }
      
      .page-description {
        font-size: 14px;
      }
    }
    
    .section-header {
      .header-actions {
        flex-direction: column;
        gap: 4px;
      }
    }
    
    .templates-content {
      .el-col {
        margin-bottom: 8px;
      }
    }
  }
}
</style> 