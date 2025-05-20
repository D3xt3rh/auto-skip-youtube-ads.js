javascript:(() => {
  function __(a) {
    return document.getElementsByClassName(a);
  }
  try {
    // Remove ad violation modal if exists
    delete window.ytInitialPlayerResponse.auxiliaryUi;
    window.ytplayer.bootstrapPlayerResponse = window["ytInitialPlayerResponse"];
  } catch (error) {}

  const video = document.getElementsByTagName("video")[0];
  let playbackRate = video.playbackRate;
  document.getElementById("logo-icon").innerHTML = playbackRate + " x";
  document.getElementById("logo-icon").removeAttribute("hidden");

  if (!window.skipAdInterval) {
    console.log("Ad skipper started");
    window.skipAdInterval = setInterval(function () {
      const adText = __("ytp-ad-text");
      const skipButton = document.querySelector(".ytp-skip-ad-button, .ytp-skip-button-slot");

      if (adText.length !== 0) {
        // If an ad is playing
        video.currentTime = video.duration; // Try to skip to end
        video.playbackRate = 16; // Play ad at 16x speed
      } else {
        video.playbackRate = playbackRate; // Restore user-selected speed
      }

      if (skipButton) {
        skipButton.click(); // Try to click skip
      }

      // Ensure video remains in focus (for full-screen cases)
      if (document.fullscreenElement && document.fullscreenElement.tagName === "VIDEO") {
        document.fullscreenElement.focus();
      } else {
        video.focus();
      }
    }, 100);

    // Playback speed control with + and -
    document.addEventListener("keydown", function (e) {
      if (e.key === "+" || e.keyCode === 107 || e.keyCode === 187) {
        video.playbackRate += 0.25;
      } else if (e.key === "-" || e.keyCode === 109 || e.keyCode === 189) {
        video.playbackRate -= 0.25;
      }
      playbackRate = video.playbackRate;
      document.getElementById("logo-icon").innerHTML = playbackRate + " x";
    });
  }
})();
