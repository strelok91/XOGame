class ProgressBar{
    constructor()
    {
        this.bar = document.getElementById("progressbar")
    }

    setProgress(progress)
    {
        this.bar.style.setProperty("--progress", `${progress}%`)
    }

    clearProgress(){
        this.setProgress(0)
    }
}