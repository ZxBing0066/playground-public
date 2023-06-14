import style from './Covered-1.module.css';
const Covered = () => {
    return (
        <div className={style.parent} data-test-id='parent'>
            <div className={style.mask} data-test-id='mask'></div>
            <div className={style.child} data-test-id='child'></div>
        </div>
    );
};
export default Covered;
