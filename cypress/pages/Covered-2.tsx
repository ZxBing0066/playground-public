import style from './Covered-2.module.css';
const Covered = () => {
    return (
        <div className={style.parent} data-test-id='parent'>
            <div className={style.mask} data-test-id='mask'></div>
            <div className={style.child + ' ' + style.left} data-test-id='child'></div>
            <div className={style.child + ' ' + style.right} data-test-id='child'></div>
            <div className={style.child + ' ' + style.top} data-test-id='child'></div>
            <div className={style.child + ' ' + style.bottom} data-test-id='child'></div>
        </div>
    );
};
export default Covered;
