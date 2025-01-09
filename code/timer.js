/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
                                 providerRes,
                                 parserRes
                             } = {}) {
    // 支持异步操作 推荐await写法
    await loadTool('AIScheduleTools')
    const dateString = await AISchedulePrompt({
        titleText: '开学时间',
        tipText: '请输入本学期的开学时间(如2025-2-24)',
        defaultText: '2025-2-24', // 提供一个合理的默认日期
        validator: value => {
            const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
            return datePattern.test(value); // 返回布尔值
        }
    })
    let timestamp;
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error('无效的日期格式');
        }
        timestamp = date.getTime();
    } catch (error) {
        console.error('日期解析失败:', error.message);
        // 处理错误，例如显示错误信息给用户
    }
    console.log("开学时间" + timestamp)
    // 这是一个示例函数，用于演示，正常用不到可以删掉
    /*const someAsyncFunc = () => new Promise(resolve => {
        setTimeout(() => resolve(), 1)
    })
    await someAsyncFunc()*/

    // 这个函数中也支持使用 AIScheduleTools 譬如给出多条时间配置让用户选择之类的

    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    return {
        totalWeek: 21, // 总周数：[1, 30]之间的整数
        startSemester: timestamp.toString(), // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: true, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 4, // 晚间课程节数：[0, 10]之间的整数
        sections: [
            {
                section: 1, // 节次：[1, 30]之间的整数
                startTime: '08:40', // 开始时间：参照这个标准格式5位长度字符串
                endTime: '09:25', // 结束时间：同上
            },
            {
                section: 2,
                startTime: '09:30',
                endTime: '10:15',
            }, {
                section: 3,
                startTime: '10:25',
                endTime: '11:10',
            }, {
                section: 4,
                startTime: '11:15',
                endTime: '12:00',
            }, {
                section: 5,
                startTime: '14:15',
                endTime: '15:00',
            }, {
                section: 6,
                startTime: '15:05',
                endTime: '15:50',
            }, {
                section: 7,
                startTime: '16:00',
                endTime: '16:40',
            }, {
                section: 8,
                startTime: '16:40',
                endTime: '17:20',
            }, {
                section: 9,
                startTime: '19:00',
                endTime: '19:45',
            }, {
                section: 10,
                startTime: '19:50',
                endTime: '20:35',
            }, {
                section: 11,
                startTime: '20:40',
                endTime: '21:25',
            }, {
                section: 12,
                startTime: '21:30',
                endTime: '22:15',
            }
        ], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }
    // PS: 夏令时什么的还是让用户在夏令时的时候重新导入一遍吧，在这个函数里边适配吧！奥里给！————不愿意透露姓名的嘤某人
}