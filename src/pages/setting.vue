<template>
    <div class="q-pa-md">
        <div class="q-mb-md">
            <q-btn color="primary" class="q-mr-md" label="刷新" icon="refresh" @click="building()"/>
            <q-btn class="col q-mr-md" label="新建" color="secondary" icon="add" @click="building()"/>
            <q-btn class="col q-mr-md" label="删除" color="red" icon="delete" @click="building()"/>
            <q-btn class="col q-mr-md" label="全部保存" color="primary" icon="save" @click="building()"/>
        </div>

        <q-list bordered class="q-mt-lg">
            <q-expansion-item
                    expand-separator
                    switch-toggle-side
                    icon="list"
                    :label="index"
                    :header-style="{fontSize: 'large' }"
                    v-for="(col,index) in settingColumns" class="rounded-borders"
            >
                <q-card>
                    <q-card-section>
                        <div class="row">
                            <!--                            <div class="text-h6 col">{{ index }}</div>-->
                            <div>
                                <q-btn class="col q-mr-md" label="新增列" color="secondary"
                                       @click="building()"/>
                                <q-btn class="col q-mr-md" label="删除列" color="red"
                                       @click="building()"/>
                                <q-btn class="col" label="保存修改" color="primary" @click="building()"/>
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator/>

                    <q-card-section class="q-pb-none">
                        <div class="row justify-center">
                            <div class="col text-subtitle1" v-for="item in items">
                                {{ item.valueName }}
                                ({{ item.value }})
                            </div>
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="row justify-between">
                            <div class="col q-pr-sm " v-for="item in items">
                                <q-input filled v-if="item.valueType==='str'" class="q-mt-md" dense v-for="c in col"
                                         v-model="c[item.value]"/>
                                <q-select filled v-if="item.valueType==='aligns'" :options="['left', 'right', 'center']"
                                          class="q-mt-md" dense v-for="c in col"
                                          v-model="c[item.value]"/>
                                <q-select filled v-if="item.valueType==='types'"
                                          :options="['primary-key', 'input', 'number','bool','other']"
                                          class="q-mt-md" dense v-for="c in col"
                                          v-model="c[item.value]"/>
                                <q-select filled v-if="item.valueType==='bool'"
                                          :options="[true,false]"
                                          class="q-mt-md" dense v-for="c in col"
                                          v-model="c[item.value]"/>
                                <q-input filled v-if="item.valueType==='option'"
                                         :options="item.option"
                                         class="q-mt-md" dense v-for="c in col"
                                         v-model="c[item.value]"/>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list>
    </div>
</template>
<script setup>
import {columns} from "components/columns";
import {building} from "components/commonResults";

const settingColumns = columns
const items = [
    {valueName: '属性名', value: 'name', valueType: 'str'},
    {valueName: '对齐方式', value: 'align', valueType: 'aligns'},
    {valueName: '标签', value: 'label', valueType: 'str'},
    {valueName: '区域', value: 'field', valueType: 'str'},
    {valueName: '类型', value: 'type', valueType: 'types'},
    {valueName: '新建', value: 'new', valueType: 'bool'},
    {valueName: '更新', value: 'update', valueType: 'bool'},
    {valueName: '选项', value: 'option', valueType: 'option'},
]
</script>
