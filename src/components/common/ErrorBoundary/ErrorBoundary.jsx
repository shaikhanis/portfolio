import { Component } from 'react'

/**
 * Catches render errors (including failed lazy-chunk loads after a redeploy) below it and
 * renders `fallback` instead of a blank page. Give it a `key` (e.g. the pathname) to reset.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error(error, info.componentStack)
  }

  render() {
    return this.state.error ? this.props.fallback : this.props.children
  }
}
