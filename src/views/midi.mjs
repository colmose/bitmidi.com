import { Component, h } from 'preact' /** @jsx h */
import c from 'classnames'

import Icon from './icon'
import Link from './link'

export default class Midi extends Component {
  render (props) {
    const { midi } = props
    const { mainColor } = this.context.theme
    const { player } = this.context.store

    const isPlaying = player.currentSlug === midi.slug

    return (
      <article
        class={c(`relative br2 mv4 shadow-6`, props.class)}
      >
        <Link
          color='white'
          class=''
          title={midi.name}
          href={midi.url}
        >
          { midi.image &&
            <div
              class='midi-image cover br2 br--top h5 bg-center'
              style={{
                backgroundImage: `url("${midi.image}")`
              }}
            />
          }
          <div
            class={c(`cf br2 bg-${mainColor} pv2 ph3`, {
              'br--bottom': midi.image
            })}
          >
            <h2 class='fl f4 mv0 lh-copy w-80 truncate underline-hover'>{midi.name}</h2>
            <Link
              color='white'
              class='fr tr grow-large'
              onClick={this.onClick}
              title={`Play ${midi.name}`}
            >
              {isPlaying
                ? <Icon class='v-btm' name='stop' />
                : <Icon class='v-btm' name='play_arrow' />
              }
            </Link>
          </div>
        </Link>
      </article>
    )
  }

  onClick = () => {
    const { dispatch } = this.context
    const { midi } = this.props
    dispatch('MIDI_PLAY_PAUSE', midi.slug)
  }
}
