import Sortable from 'sortablejs';

const commonJS = {
    rowDrop(data){
        const tbody = document.querySelector('.el-table__body-wrapper tbody');
        Sortable.create(tbody, {
            onEnd({ newIndex, oldIndex }) {
              const currRow = data.splice(oldIndex, 1)[0]
              data.splice(newIndex, 0, currRow);
            }
        })
    },
    columnDrop(dropCol,num) {
        const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
         Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          onEnd: evt => {
            const oldItem = dropCol[evt.oldIndex - num]
            dropCol.splice(evt.oldIndex-num, 1)
            dropCol.splice(evt.newIndex-num, 0, oldItem)
          }
        })
      },
};

export default commonJS;