'use strict';

function model () {
    const isEmptyString = key => !key.trim();

    return {
        dbKey: null,
        currentId: null,

        setData (data) {
            let localData = structuredClone(data);
            localData.id = this.currentId;

            const dataFromDB = localStorage.getItem(this.dbKey);
            let response = null;
            let dataToSave = dataFromDB ? JSON.parse(dataFromDB) : [];
            dataToSave.push(localData);

            try {
                localStorage.setItem(this.dbKey, JSON.stringify(dataToSave));
                response = {
                    success: true,
                    data: localData,
                };
                this.currentId += 1;
            } catch(e) {
                response = {
                    success: false,
                    errors: e,
                }
            }
            return response;
        },
        getData() {
            return JSON.parse(localStorage.getItem(this.dbKey));
        },

        init(dbKey) {
            if (isEmptyString(dbKey)) throw new Error('Key is not provided');
            this.dbKey = dbKey;

            const dataFromDB = JSON.parse(localStorage.getItem(this.dbKey));
            this.currentId = dataFromDB ? dataFromDB[dataFromDB.length - 1].id + 1 : 1;
        },

        removeDataFromDB(data) {
            let currentId = event.target.id;
            let savedData = structuredClone(data);
            const wrapper = document.querySelector('.data-todo-item');
            let filteredData = null;

            filteredData = savedData.filter(item => {
                if (item.id != currentId) return item;
            });

            filteredData = JSON.stringify(filteredData);
            if(localStorage.getItem(this.dbKey).length !== 0) localStorage.setItem(this.dbKey, filteredData);
        },
    }
}