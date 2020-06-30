<template>
    <div>
         <!-- 九宫格 -->
        <div class="grid">
            <van-grid :column-num="3">
                <van-grid-item icon="notes-o" text="订单管理" to=""/>
                <van-grid-item icon="gem-o" text="库存管理" />
                <van-grid-item icon="location-o" text="商品发布" to="publish"/>
                <van-grid-item icon="coupon-o" text="优惠券" />
                <van-grid-item icon="star-o" text="被收藏" />
                <van-grid-item icon="passed" text="意见反馈" />
            </van-grid>
        </div>

    </div>
</template>