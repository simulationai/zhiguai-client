import "./VoiceLoading.css"

const VoiceLoading = ({ onClick }) => {
    return (
        <div onClick={onClick} className="loading-wave">
            <div className="loading-bar" />
            <div className="loading-bar" />
            <div className="loading-bar" />
            <div className="loading-bar" />
            <div className="loading-bar" />
        </div>

    )
}
export default VoiceLoading;