<template>
    <div class="column" style="height: 90vh">
        <div class="col">

            <div class="row justify-around">
                <HomePageCard title="今日请假人数" data="121" color="primary"/>
                <HomePageCard title="今日注册申请数" data="324" color="secondary"/>
                <HomePageCard title="学生总人数" data="123" color="accent"/>
                <HomePageCard title="教师总人数" data="123" color="positive"/>
            </div>

        </div>
        <div class="col">

            <div class="row">
                <div class="col">
                    <div ref="chart1" style="width: 100%; height: 400px"></div>
                </div>
                <div class="col">
                    <div ref="chart2" style="width: 100%; height: 400px"></div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
//  按需引入 echarts
import HomePageCard from "components/HomePageCard.vue";
import {onMounted, ref} from "vue";
import * as echarts from "echarts";

const chart1 = ref()
const chart2 = ref()
const chart3 = ref()
onMounted(
    () => {
        initChart1()
        initChart2()

    }
)

function initChart1() {
    const myChart = echarts.init(chart1.value);
    const option = {
        title: {
            text: '请假人数折线图',
            x: 'center',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['计算机学院', '下北泽学院', '文传学院', '外国语学院', '物电学院'],
            x: 'center',
            y: '30'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '计算机学院',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '下北泽学院',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '文传学院',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '外国语学院',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '物电学院',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    myChart.setOption(option);
}

function initChart2() {
    const myChart = echarts.init(chart2.value);
    const option = {
        title: {
            text: '请假人数占比',
            subtext: '计算机学院',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    {value: 1048, name: '计算机科学与技术'},
                    {value: 735, name: '软件工程'},
                    {value: 580, name: '物联网工程'},
                    {value: 484, name: '信息安全'},
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}
</script>
