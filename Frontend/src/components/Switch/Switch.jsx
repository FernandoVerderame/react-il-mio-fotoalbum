const Switch = ({ checked, onChange }) => {
    return (
        <div className="form-check form-switch">
            <input
                type="checkbox"
                role="switch"
                id="userFilter"
                checked={checked}
                onChange={onChange}
                className="form-check-input"
            />
            <label className="form-check-label text-white" htmlFor="userFilter">User Foto</label>
        </div>
    );
}

export default Switch;