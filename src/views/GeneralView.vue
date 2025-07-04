<template>
  <div class="general-view">
    <!-- 页面头部 -->
    <div class="page-header fade-in">
      <h2 class="page-title">通用处理</h2>
      <p class="page-description">对文本数据进行格式化、清理和预处理操作</p>
    </div>

    <!-- 功能卡片 -->
    <div class="feature-cards slide-up">
      <el-row :gutter="24">
        <!-- 文本格式化 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="feature-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon" :size="20" color="#409eff">
                  <EditPen />
                </el-icon>
                <span class="card-title">文本格式化</span>
              </div>
            </template>
            <div class="card-content">
              <p class="card-description">
                格式化文本内容，支持去除空行、首尾空格、大小写转换等操作
              </p>
              <el-button type="primary" size="small" plain class="mt-16">
                立即使用
              </el-button>
            </div>
          </el-card>
        </el-col>

        <!-- JSON格式化 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="feature-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon" :size="20" color="#67c23a">
                  <DocumentChecked />
                </el-icon>
                <span class="card-title">JSON格式化</span>
              </div>
            </template>
            <div class="card-content">
              <p class="card-description">
                美化和压缩JSON数据，支持语法检查和多种缩进格式
              </p>
              <el-button type="success" size="small" plain class="mt-16">
                立即使用
              </el-button>
            </div>
          </el-card>
        </el-col>

        <!-- 数据清理 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="feature-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon" :size="20" color="#e6a23c">
                  <Brush />
                </el-icon>
                <span class="card-title">数据清理</span>
              </div>
            </template>
            <div class="card-content">
              <p class="card-description">
                清理和整理数据，移除特殊字符、重复内容、排序等
              </p>
              <el-button type="warning" size="small" plain class="mt-16">
                立即使用
              </el-button>
            </div>
          </el-card>
        </el-col>

        <!-- URL编解码 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="feature-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon" :size="20" color="#f56c6c">
                  <Link />
                </el-icon>
                <span class="card-title">URL编解码</span>
              </div>
            </template>
            <div class="card-content">
              <p class="card-description">
                URL编码和解码工具，处理特殊字符和中文编码
              </p>
              <el-button type="danger" size="small" plain class="mt-16">
                立即使用
              </el-button>
            </div>
          </el-card>
        </el-col>

        <!-- Base64编解码 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="feature-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon class="card-icon" :size="20" color="#909399">
                  <Key />
                </el-icon>
                <span class="card-title">Base64编解码</span>
              </div>
            </template>
            <div class="card-content">
              <p class="card-description">
                Base64编码和解码，支持文本和文件的编解码操作
              </p>
              <el-button type="info" size="small" plain class="mt-16">
                立即使用
              </el-button>
            </div>
          </el-card>
        </el-col>

        <!-- 更多功能 -->
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="feature-card add-feature-card" shadow="hover">
            <div class="add-feature-content">
              <el-icon class="add-icon" :size="32" color="#c0c4cc">
                <Plus />
              </el-icon>
              <h4 class="add-title">添加更多功能</h4>
              <p class="add-description">
                根据需求定制更多数据处理功能
              </p>
              <el-button type="primary" text class="mt-16">
                <el-icon><Plus /></el-icon>
                自定义功能
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 快速操作 -->
    <div class="quick-actions mt-24 slide-up">
      <el-card>
        <template #header>
          <div class="section-header">
            <el-icon :size="18" color="#409eff">
              <Lightning />
            </el-icon>
            <span class="section-title">快速操作</span>
          </div>
        </template>
        <div class="quick-actions-content">
          <el-space wrap :size="12">
            <el-tag size="large" type="primary" effect="plain">
              <el-icon><EditPen /></el-icon>
              去除空行
            </el-tag>
            <el-tag size="large" type="success" effect="plain">
              <el-icon><DocumentChecked /></el-icon>
              JSON美化
            </el-tag>
            <el-tag size="large" type="warning" effect="plain">
              <el-icon><Brush /></el-icon>
              去重排序
            </el-tag>
            <el-tag size="large" type="danger" effect="plain">
              <el-icon><Link /></el-icon>
              URL解码
            </el-tag>
            <el-tag size="large" type="info" effect="plain">
              <el-icon><Key /></el-icon>
              Base64编码
            </el-tag>
          </el-space>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { 
  EditPen, 
  DocumentChecked, 
  Brush, 
  Link, 
  Key, 
  Plus, 
  Lightning 
} from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.general-view {
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
  
  .feature-cards {
    .feature-card {
      height: 100%;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-4px);
      }
      
      .card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .card-icon {
          flex-shrink: 0;
        }
        
        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--el-text-color-primary);
        }
      }
      
      .card-content {
        .card-description {
          font-size: 14px;
          color: var(--el-text-color-regular);
          line-height: 1.6;
          margin: 0;
        }
      }
    }
    
    .add-feature-card {
      border: 2px dashed var(--el-border-color);
      
      &:hover {
        border-color: var(--el-color-primary);
      }
      
      .add-feature-content {
        text-align: center;
        padding: 20px;
        
        .add-icon {
          margin-bottom: 12px;
        }
        
        .add-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--el-text-color-primary);
          margin: 0 0 8px 0;
        }
        
        .add-description {
          font-size: 14px;
          color: var(--el-text-color-regular);
          margin: 0;
        }
      }
    }
  }
  
  .quick-actions {
    .section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .section-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }
    }
    
    .quick-actions-content {
      .el-tag {
        cursor: pointer;
        transition: transform 0.2s ease;
        
        &:hover {
          transform: scale(1.05);
        }
        
        .el-icon {
          margin-right: 4px;
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .general-view {
    .page-header {
      margin-bottom: 24px;
      
      .page-title {
        font-size: 24px;
      }
      
      .page-description {
        font-size: 14px;
      }
    }
    
    .feature-cards {
      .el-col {
        margin-bottom: 16px;
      }
    }
  }
}
</style> 