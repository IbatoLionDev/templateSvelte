export function actInput(inputData, item, option) {
    console.log(option);
    return inputData.map((data) => {
        if (data.key) {
            let value = item?.[data.key] || '';
            let opt = '';
            if (option && option[0] && 'option' in data && data.type !== 'multi') {
                const selectOption = option.shift()
                opt = (selectOption.map(opt => opt[data.key]));
                console.log(opt);
            } else if (data.type == 'multi') {
                opt = JSON.stringify(option.map(opt => opt.serviceName));
            }

            return opt ? { ...data, value, option: opt } : { ...data, value };
        } else {
            return data;
        }
    });
}