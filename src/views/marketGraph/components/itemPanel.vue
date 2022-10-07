<!--
 * @Author: Jelly
 * @Date: 2022-08-31 09:50:42
 * @LastEditTime: 2022-09-28 14:09:19
 * @LastEditors: Jelly
 * @Description: 营销计划操作栏
-->
<template>
  <div class="item-panel" ref="itemPanel">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        :title="collapse.label"
        :name="collapse.activeNames"
        v-for="collapse in data"
        :key="collapse.activeNames"
      >
        <ul class="operate-button">
          <li
            class="o-button"
            v-for="item in collapse.children"
            draggable="true"
            :data-shape="item.shape"
            @dragstart="(e) => dragStart(e, item)"
          >
            <div class="rect" v-if="item.shape === 'rect' && item.icon">
              <img :src="item.icon" alt="" />
            </div>
            <div class="circle" v-if="item.shape === 'circle' && item.icon">
              <img :src="item.icon" alt="" />
            </div>
            <div class="diamond" v-if="item.shape === 'diamond' && item.icon">
              <img :src="item.icon" alt="" />
            </div>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { getImageUrl } from '@/utils/index'
export default {
  data() {
    return {
      activeNames: ['1', '2', '3'],
      // 操作栏节点
      data: [
        {
          label: '动作',
          activeNames: '1',
          children: [
            {
              id: 1,
              label: '发放奖励',
              icon: getImageUrl('png/gift.png'),
              shape: 'rect',
              imgColor: '#72C6D0 ', //图标背景色
              backgroundColor: '#81D2DC ', // 节点背景色
              color: '#fff', // 字体颜色
              componentType: 201, // 组件类型
            },
          ],
        },
        {
          label: '流程控制',
          activeNames: '2',
          children: [
            {
              id: 2, // 节点id
              label: '结束', // 节点名称
              shape: 'circle', // 节点形状
              icon: getImageUrl('png/break.png'), // 节点图标
              imgColor: '#E37273', //图标背景色
              backgroundColor: '#EEAAAA', // 节点背景色
              color: '#fff', // 字体颜色
              componentType: 2,
            },
          ],
        },
        {
          label: '条件控制',
          activeNames: '3',
          children: [
            {
              id: 3,
              label: '群组判断',
              shape: 'diamond',
              icon: getImageUrl('png/group.png'),
              imgColor: '#F2AE3A ', //图标背景色
              backgroundColor: '#F5BF3E', // 节点背景色
              color: '#fff', // 字体颜色
              componentType: 101,
            },
            {
              id: 4,
              label: '事件判断',
              shape: 'diamond',
              icon: getImageUrl('png/condition.png'),
              imgColor: '#F2AE3A ', //图标背景色
              backgroundColor: '#F5BF3E', // 节点背景色
              color: '#fff', // 字体颜色
              componentType: 102, // 组件类型
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    dragStart(e, item) {
      e.dataTransfer.setData('item', JSON.stringify({ item: item }))
    },
  },
}
</script>
<style lang="scss" scoped>
.item-panel {
  display: inline-block;
  width: 400px;
  background-color: #363636 !important;
  color: white !important;
  box-sizing: border-box;
  padding: 20px 10px;

  .operate-button {
    color: #fff;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    li {
      margin-right: 20px;
      text-align: center;
      display: flex;
      flex-direction: column;

      span {
        margin-top: 10px;
      }

      div {
        img {
          width: 100%;
          height: 100%;
        }

        margin: 0 5px;
        padding: 5px;
        width: 40px;
        height: 40px;
        text-align: center;
      }

      .rect {
        background-color: #8cb9d4;
        border-radius: 10px;
      }

      .circle {
        background-color: #e37273;
        border-radius: 50%;
      }

      .diamond {
        width: 30px;
        height: 30px;
        background-color: #d9aa63;
        border-radius: 10px;
        transform: rotate(45deg);
        position: relative;

        img {
          transform: rotate(-45deg);
        }
      }
    }
  }

  &:deep(.el-collapse) {
    border-color: #363636;
  }

  &:deep(.el-collapse-item__header) {
    background-color: #363636;
    color: #fff;
    border-color: #363636;
  }

  &:deep(.el-collapse-item__wrap) {
    background-color: #262626;
    color: #fff;
    border-color: #262626;
  }

  &:deep(.el-collapse-item__arrow) {
    color: #37c7ce;
  }
}
</style>
