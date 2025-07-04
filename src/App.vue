<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Operation, Setting, DocumentCopy, QuestionFilled } from '@element-plus/icons-vue'

const route = useRoute()

/**
 * 当前激活的菜单项
 */
const activeMenu = computed(() => {
  const path = route.path
  if (path.startsWith('/general')) return '/general'
  if (path.startsWith('/compare')) return '/compare'
  return '/general'
})

/**
 * 处理菜单选择事件
 * @param {string} key - 菜单项的索引
 */
const handleMenuSelect = (key) => {
  console.log('选择菜单:', key)
}

onMounted(() => {
  console.log('差异对比系统已启动')
})
</script>

<template>
  <div id="app">
    <el-container class="layout-container">
      <!-- 顶部导航栏 -->
      <el-header height="64px" class="header fade-in">
        <div class="header-wrapper">
          <!-- Logo区域 -->
          <div class="logo-section">
            <el-icon :size="24" color="#409eff" class="logo-icon">
              <Operation />
            </el-icon>
            <h1 class="logo-title">差异对比系统</h1>
          </div>
          
          <!-- 导航菜单 -->
          <el-menu
            :default-active="activeMenu"
            class="header-menu"
            mode="horizontal"
            router
            @select="handleMenuSelect"
          >
            <el-menu-item index="/general">
              <el-icon><Setting /></el-icon>
              <span>通用处理</span>
            </el-menu-item>
            <el-menu-item index="/compare">
              <el-icon><DocumentCopy /></el-icon>
              <span>差异对比</span>
            </el-menu-item>
          </el-menu>
          
          <!-- 右侧操作区 -->
          <div class="header-actions">
            <el-button text class="action-btn">
              <el-icon><QuestionFilled /></el-icon>
              帮助
            </el-button>
            <el-button text class="action-btn">
              <el-icon><Setting /></el-icon>
              设置
            </el-button>
          </div>
        </div>
      </el-header>
      
      <!-- 主内容区域 -->
      <el-main class="main-content">
        <div class="content-wrapper">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in" appear>
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  min-height: 100vh;
  background: var(--el-bg-color-page);
}

.header {
  display: flex;
  align-items: center;
  padding: 0;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }
  
  .logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    
    .logo-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .logo-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      margin: 0;
    }
  }
  
  .header-menu {
    flex: 1;
    margin: 0 40px;
    border-bottom: none;
    background: transparent;
    
    :deep(.el-menu-item) {
      font-size: 14px;
      font-weight: 500;
      color: var(--el-text-color-regular);
      border-bottom: 2px solid transparent;
      margin-right: 32px;
      padding: 0 8px;
      height: 64px;
      line-height: 64px;
      
      &:hover {
        color: var(--el-color-primary);
        background: transparent;
      }
      
      &.is-active {
        color: var(--el-color-primary);
        border-bottom-color: var(--el-color-primary);
        background: transparent;
      }
      
      .el-icon {
        margin-right: 4px;
        font-size: 16px;
      }
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    
    .action-btn {
      color: var(--el-text-color-regular);
      font-size: 14px;
      
      &:hover {
        color: var(--el-color-primary);
      }
      
      .el-icon {
        margin-right: 4px;
      }
    }
  }
}

.main-content {
  padding: 0;
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 24px;
    min-height: calc(100vh - 64px);
  }
}

// 路由切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    .header-wrapper {
      padding: 0 16px;
    }
    
    .logo-section {
      .logo-title {
        font-size: 16px;
      }
    }
    
    .header-menu {
      margin: 0 16px;
      
      :deep(.el-menu-item) {
        margin-right: 16px;
        font-size: 13px;
        
        span {
          display: none;
        }
      }
    }
    
    .header-actions {
      .action-btn {
        font-size: 13px;
        
        span {
          display: none;
        }
      }
    }
  }
  
  .main-content {
    .content-wrapper {
      padding: 16px;
    }
  }
}

@media (max-width: 480px) {
  .header {
    .header-wrapper {
      padding: 0 12px;
    }
    
    .header-menu {
      margin: 0 8px;
      
      :deep(.el-menu-item) {
        margin-right: 8px;
        padding: 0 4px;
      }
    }
    
    .header-actions {
      gap: 4px;
    }
  }
}
</style>
