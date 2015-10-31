function removeElement(index){
    var form = $('<form></form>');

    form.attr("method", "post");

    var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", 'index');
        field.attr("value", index);

        form.append(field);

    $(document.body).append(form);
    form.submit();
}