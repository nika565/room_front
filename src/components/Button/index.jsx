export default function Button ({ title, onClickEvent, className }) {

    return (
        <button onClick={onClickEvent} className={className}>
            {title}
        </button>
    );

}