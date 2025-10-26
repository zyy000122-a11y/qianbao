document.addEventListener('DOMContentLoaded', function () {
  const pages = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.nav-item');

  // 默认显示资产页
  showPage('asset');

  // 绑定导航点击事件
  navItems.forEach(item => {
    if (!item.classList.contains('disabled')) {
      item.addEventListener('click', () => {
        const pageId = item.getAttribute('data-page');
        showPage(pageId);

        // 更新导航高亮
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
      });
    }
  });

  function showPage(pageId) {
    // 隐藏所有页面
    pages.forEach(page => page.classList.remove('active'));

    // 显示目标页面
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
      targetPage.classList.add('active');
    }
  }
});


document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function() {
    const target = this.getAttribute('data-target');
    // 跳转到对应页面（当前页面内切换或新页面）
    // 这里我们模拟跳转到一个空状态页
    window.location.hash = `#${target}`;
    
    // 或者用 SPA 方式切换内容（示例）
    showPage(target);
  });
});

function showPage(pageId) {
  // 隐藏所有页面
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  
  // 显示目标页面（这里创建一个空状态页）
  let page = document.getElementById(`${pageId}-page`);
  if (!page) {
    page = document.createElement('div');
    page.id = `${pageId}-page`;
    page.className = 'page';
    page.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h3>${getPageTitle(pageId)}</h3>
        <p style="color: #999;">此功能正在开发中...</p>
      </div>
    `;
    document.body.appendChild(page);
  }
  page.style.display = 'block';
}

function getPageTitle(id) {
  const titles = {
    'asset-overview': '资产总览',
    'wallet-management': '管理钱包',
    'transaction-record': '交易记录',
    'experience-zone': '体验区',
    'address-book': '地址本',
    'invite-friends': '邀请好友',
    'wallet-guide': '钱包指引',
    'about-us': '关于我们',
    'system-settings': '系统设置'
  };
  return titles[id] || '未知页面';
}




// ----------------------------------------------底部导航--------------------------------------------------

// 初始化：设置默认选中项（如“资产”）
let currentActivePage = 'asset';

// 为每个导航项绑定点击事件
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function() {
    // 移除所有 active 类
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    // 添加当前 active 类
    this.classList.add('active');
    
    // 更新当前页面
    currentActivePage = this.getAttribute('data-page');
    
    // 切换图标（选中状态使用 _active.png）
    updateNavIcons();
    
    // 跳转到对应页面（示例：显示空状态页）
    showPage(currentActivePage);
  });
});

// 更新图标函数
function updateNavIcons() {
  document.querySelectorAll('.nav-item').forEach(item => {
    const page = item.getAttribute('data-page');
    const iconImg = item.querySelector('.nav-icon');
    const isActive = item.classList.contains('active');
    
    let imgName = page === 'asset' ? 'zc' :
                  page === 'market' ? 'qx' :
                  page === 'trade' ? 'jy' :
                  page === 'discover' ? 'fx' :
                  page === 'my' ? 'wd' : '';
    
    if (isActive) {
      iconImg.src = `./img/tabbar/${imgName}_active.png`;
    } else {
      iconImg.src = `./img/tabbar/${imgName}.png`;
    }
  });
}

// 显示页面函数（模拟 SPA）
function showPage(pageId) {
  // 隐藏所有页面
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  
  // 显示目标页面（创建空状态页）
  let page = document.getElementById(`${pageId}-page`);
  if (!page) {
    page = document.createElement('div');
    page.id = `${pageId}-page`;
    page.className = 'page';
    page.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h3>${getPageTitle(pageId)}</h3>
        <p style="color: #999;">此功能正在开发中...</p>
      </div>
    `;
    document.body.appendChild(page);
  }
  page.style.display = 'block';
}

function getPageTitle(id) {
  const titles = {
    'asset': '资产总览',
    'market': '行情',
    'trade': '交易',
    'discover': '发现',
    'my': '我的'
  };
  return titles[id] || '未知页面';
}

// 页面加载时初始化图标
document.addEventListener('DOMContentLoaded', updateNavIcons);



// ------------------------------------------------------我的
// 为每个菜单项绑定点击跳转事件
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', function(e) {
    const target = this.getAttribute('data-target');
    
    // 映射目标页面路径（可按需修改）
    const pageMap = {
      'asset-overview': '/pages/asset-overview.html',
      'wallet-management': '/pages/wallet-management.html',
      'transaction-record': '/pages/transaction-record.html',
      'experience-zone': '/pages/experience-zone.html',
      'address-book': '/pages/address-book.html',
      'invite-friends': '/pages/invite-friends.html',
      'wallet-guide': '/pages/wallet-guide.html',
      'about-us': '/pages/about-us.html',
      'system-settings': '/pages/system-settings.html'
    };

    const url = pageMap[target];
    if (url) {
      // 跳转到新页面（非 index）
      window.location.href = url;
    } else {
      console.warn('未定义页面路径:', target);
    }
  });
});