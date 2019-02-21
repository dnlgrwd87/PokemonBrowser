<template>
    <transition name="back-to-top-fade">
        <div class="vue-back-to-top" v-show="visible" @click="backToTop">
            <i class="fa fa-chevron-up"></i>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'BackToTop',
    props: {
        visibleoffset: {
            type: [String, Number],
            default: 1000
        },
        visibleoffsetbottom: {
            type: [String, Number],
            default: 0
        }
    },
    data() {
        return {};
        visible: false;
    },
    mounted() {
        window.smoothscroll = () => {
            let currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(window.smoothscroll);
                window.scrollTo(
                    0,
                    Math.floor(currentScroll - currentScroll / 5)
                );
            }
        };
        window.addEventListener('scroll', this.catchScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.catchScroll);
    },
    methods: {
        catchScroll() {
            const pastTopOffset =
                window.pageYOffset > parseInt(this.visibleoffset);
            const pastBottomOffset =
                window.innerHeight + window.pageYOffset >=
                document.body.offsetHeight - parseInt(this.visibleoffsetbottom);
            this.visible =
                parseInt(this.visibleoffsetbottom) > 0
                    ? pastTopOffset && !pastBottomOffset
                    : pastTopOffset;
        },
        backToTop() {
            window.smoothscroll();
            this.$emit('scrolled');
        }
    }
};
</script>

<style scoped>
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
    transition: opacity 0.7s;
}
.back-to-top-fade-enter,
.back-to-top-fade-leave-to {
    opacity: 0;
}

.vue-back-to-top {
    position: fixed;
    z-index: 1000;
    cursor: pointer;
    bottom: 30px;
    right: 30px;
    width: 35px;
    height: 35px;
    border-radius: 100px;
    background: rgb(148, 151, 156);
    box-shadow: 0px 0px 2px rgb(88, 87, 87);
}

.fa-chevron-up {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -55%);
    color: white;
}
</style>
