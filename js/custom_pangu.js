/**
 * Pangu.js - CJK 字符间距自动修正
 * 官网：https://github.com/vinta/pangu.js
 */
(function() {
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/pangu@4.0.7/dist/browser/pangu.min.js';
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.onload = function() {
    if (window.pangu) {
      window.pangu.spacingPage();

      // 增强中文引号的可见性
      enhanceChineseQuotes();

      // PJAX 页面切换时重新执行
      document.addEventListener('pjax:complete', function() {
        window.pangu.spacingPage();
        enhanceChineseQuotes();
      });

      console.log('[NexT] Pangu OK - 引号增强已启用');
    }
  };
  document.head.appendChild(s);
})();

/**
 * 增强中文引号的可见性
 * 给引号周围添加适当的字间距和字重
 */
function enhanceChineseQuotes() {
  // 创建并插入样式
  var styleId = 'next-quote-enhance-style';
  if (!document.getElementById(styleId)) {
    var style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* 正文区域引号增强 */
      .post-body p,
      .post-body li,
      .post-body span {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }

      /* 标点符号增强 - 通过伪元素无法精确控制单个字符，
         改用字间距和字重增强整体可读性 */
      .post-body {
        letter-spacing: 0.01em;
        word-spacing: 0.02em;
      }

      /* 引号所在文本块稍微加粗 */
      .post-body p {
        font-weight: 450;
      }
    `;
    document.head.appendChild(style);
  }
}
