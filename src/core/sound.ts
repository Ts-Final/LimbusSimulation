function play(elementId: string) {
  return function play() {
    (document.getElementById(elementId) as HTMLAudioElement)
      .play()
      .catch(() => {return })
  }
}

export const sound = {
  char: {
    hover: {
      play: play("sound-char-hover"),
    }
  },
  click: {
    play: play("sound-click")
  },
  coin: {
    success: {
      play: play("sound-coin")
    }
  },
  ego: {
    overclock: {
      charge: {
        play: play("sound-ego-overclock-charge")
      },
      stable: {
        play: play("sound-ego-overclock-stable")
      },
      unstable: {
        play: play("sound-ego-overclock-unstable")
      }
    }
  },
  ui: {
    open: {
      play: play("sound-ui-open")
    }
  },
  skill: {
    hover: {
      play: play("sound-skill-hover")
    }
  },
  tab: {
    click: {
      play: play("sound-tab-click")
    }
  },
  snap: {
    play: play("sound-snap")
  }
}