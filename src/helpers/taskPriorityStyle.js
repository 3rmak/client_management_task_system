export function setTaskPriorityStyle(task) {
    const style = {};
    switch (Number(task.priority)){
        case 0:
            style.background = '#dee2e6';
            break;
        case 1:
            style.background = '#ffda6a';
            break;
        case 2:
            style.background = '#feb272';
            break;
        case 3:
            style.background = '#fd7e14';
            break;
        case 4:
            style.background = '#dc3545';
            break;
        default:
            style.background = '#dee2e6';
            break;
    }

    return style;
}
