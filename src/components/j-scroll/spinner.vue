<template>
  <svg :style="spinner" viewBox="0 0 64 64">
    <g>
      <circle cx="16" cy="32" stroke-width="0"
              r="3">
        <animate
          attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate>
        <animate
          attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
      </circle>
      <circle
        cx="32" cy="32" stroke-width="0" r="3.09351">
        <animate attributeName="fill-opacity" dur="750ms"
                 values=".5;.5;.6;.8;1;.8;.6;.5"
                 repeatCount="indefinite"></animate>
        <animate
          attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
      </circle>
      <circle
        cx="48" cy="32" stroke-width="0" r="4.09351">
        <animate attributeName="fill-opacity" dur="750ms"
                 values=".6;.5;.5;.6;.8;1;.8;.6"
                 repeatCount="indefinite"></animate>
        <animate
          attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5"
          repeatCount="indefinite"></animate>
      </circle>
    </g>
  </svg>
</template>

<script>
  export default {
    name: "spinner",
    props: {
      fill: {
        type: String,
        default: '#ec4949'
      },
      stroke: {
        type: String,
        default: '#69717d'
      }
    },
    computed: {
      spinner() {
        return {
          marginTop: '14px',
          width: '32px',
          height: '32px',
          fill: this.fill,
          stroke: this.stroke,
        }
      }
    }
  }
</script>
