'use strict';
$(document).ready(function(){
    new Pagination('nav[aria-label="Page navigation"]', 30, 7);
});
function Pagination(root, total, current) {
    this.root = $(root);
    this.total = total;
    this.current = current;
    this.render();
}
Pagination.prototype = {
    render: function () {
        var root = this.root,
            ul = $('<ul class="pagination">'),
            i;
        this.root.empty();//метод jQuery, очистить содержимое элемента
        function appendItem(itemSign, itemClass) {
            var li = $('<li>'),
                a = $('<a>');
            if (itemSign !== '..' && itemClass !== 'active') a.attr('href', '#');//атрибут href добавляем для всех элементов кроме двоеточия и кроме номера текущей страницы
            li.append($(a).text(itemSign));
            if (itemClass) li.addClass(itemClass);
            ul.append(li);
        }
        //в коде ниже добавляем все необходимые элементы li
        if (this.total > 1) {
            if (this.current === 1) appendItem('\u00ab', 'disabled');//добавляем неактивную левую стрелку
            else appendItem('\u00ab');//добавляем активную левую стрелку
            if (this.current > 6) {//при большом количестве страниц, заменяем их двоеточием
                appendItem(1);//добавляем первые два элемента
                appendItem(2);
                appendItem('..', 'disabled');//добавляем многоточие
                appendItem(this.current - 2);//добавляем два элемента слева от current
                appendItem(this.current - 1);
            } else {//при малом количестве страниц добавляем их все, без замены на двоеточие
                for (i = 1; i < this.current; i++) appendItem(i);//от 1 до current - 1 добавляем все элементы
            }
            appendItem(this.current, 'active');//добавляем current и делаем его активным
            if (this.total - this.current > 6) {//при большом количестве страниц, заменяем их двоеточием
                appendItem(this.current + 1);//добавляем 2 элемента справа от current
                appendItem(this.current + 2);
                appendItem('..', 'disabled');//добавляем многоточие
                appendItem(this.total - 1);//добавляем 2 последних элемента
                appendItem(this.total);
            } else {//при малом количестве страниц добавляем их все, без замены на двоеточие
                for (i = this.current + 1; i <= this.total; i++) appendItem(i);//добавляем всё элементы от current + 1 до total
            }
            if (this.current === this.total) appendItem('\u00bb', 'disabled');//добавляем неактивную правую стрелку
            else appendItem('\u00bb');//добавляем активную правую стрелку
            root.append(ul);//добавляем весь список в навигацию страницы
        }
    },
    handleClick: function () {
        //здесь пока ничего
    }
};
