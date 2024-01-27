import './Error500.scss'

function Error500() {
  return (
    <main>
      <div id="wrap">
        <div className="hand hand-left">
          <span className="hand-part part-top"></span>
          <span className="hand-part part-middle"></span>
          <span className="hand-part part-bottom"></span>
        </div>
        <div className="hand hand-right">
          <span className="hand-part part-top"></span>
          <span className="hand-part part-middle"></span>
          <span className="hand-part part-bottom"></span>
        </div>
        <div className="line line-1">
          <div className="ball">5</div>
        </div>
        <div className="line line-2">
          <div className="ball">0</div>
        </div>
        <div className="line line-3">
          <div className="ball">0</div>
        </div>
        <div id="server">
          <div className="eye eye-left">
            <span></span>
          </div>
          <div className="eye eye-right">
            <span></span>
          </div>
          <div className="block">
            <div className="light"></div>
          </div>
          <div className="block">
            <div className="light"></div>
          </div>
          <div className="block">
            <div className="light"></div>
          </div>
          <div className="block">
            <div className="light"></div>
          </div>
          <div className="block">
            <div className="light"></div>
          </div>
          <div id="bottom-block">
            <div className="bottom-line"></div>
            <div id="bottom-light"></div>
          </div>
        </div>
      </div>

      <div id="code-error">
        <h2>
          Lỗi máy chủ! <br />
          <span style={{ color: 'red' }}>Internal Server Error!!!</span> <br />
          Vui lòng liên hệ bộ phận kỹ thuật để khắc phục!
        </h2>
      </div>
    </main>
  )
}

export default Error500
