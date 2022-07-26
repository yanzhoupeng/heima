<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | timeFilter }}
          </div>

          <!-- 关注按钮 -->
          <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
          >
            已关注
          </van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
          >
            关注
          </van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleById"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" badge="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById, followUser, cannelFollowUser } from '@/api/article.js'

import { ImagePreview } from 'vant'

import './github-markdown.css'

export default {
  name: 'ArticleIndex',

  data() {
    return {
      article: {},
      isLoading: true, // 加载状态
      errorStatus: -1 // 错误状态码
    }
  },

  props: {
    article_id: {
      type: [Number, String],
      required: true
    }
  },

  methods: {
    // 加载文章数据
    async loadArticleById() {
      // 加载状态 显示加载动画
      this.isLoading = true

      try {
        // 通过接口获取文章详情
        const {
          data: { data }
        } = await getArticleById(this.article_id)

        // 抛出错误 测试catch
        // if (Math.random() > 0.5) {
        //   throw new Error('Error')
        // }

        // 使用定时器 在DOM更新完成后调用图片预览功能
        setTimeout(() => {
          this.previewImg()
        }, 0)

        // 将文章数据存入变量中
        this.article = data
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errorStatus = 404
        }
      }

      // 结束加载状态 隐藏加载动画
      this.isLoading = false
    },

    // 预览图片
    previewImg() {
      // 通过refs获取指定DOM元素
      const articleContent = this.$refs['article-content']
      // 通过querySelectorAll获取指定元素
      const imgs = articleContent.querySelectorAll('img')
      // 定义数组存储img元素的src属性
      const images = []

      // 遍历每一个img元素 绑定点击事件
      imgs.forEach((img, id) => {
        // 将src属性压入数组中
        images.push(img.src)

        // 绑定点击事件
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: id
          })
        }
      })
    },

    // 关注按钮点击事件
    async onFollow() {
      try {
        // 判断关注状态 确定使用接口
        if (!this.article.is_followed) {
          // 未关注
          await followUser(this.article.aut_id)
        } else {
          // 已关注
          await cannelFollowUser(this.article.aut_id)
        }

        // 关注状态更换
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        // 使用变量存储弹出信息
        let msg = '请求失败'

        // 关注用户自己时 接口会返回400报错
        if (error.response && error.response.status === 400) {
          msg = '不能关注自己'
        }

        this.$toast(msg)
      }
    }
  },

  created() {
    // 在页面创建完成后 调用文章详情加载函数
    this.loadArticleById()
  }
}
</script>

<style scoped lang="less">
.article-container {
  .page-nav-bar {
    .van-icon {
      color: #fff;
      font-size: 30px;
    }
  }

  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
