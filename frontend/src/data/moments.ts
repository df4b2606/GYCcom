// 动态数据接口
export interface Moment {
  id: number;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags?: string[];
  location?: string;
}

// 示例动态数据
export const moments: Moment[] = [
  {
    id: 1,
    content:
      '今天在公园里看到了一只很可爱的小松鼠，它居然不怕人，还在我面前表演了一段"杂技"。这种简单的快乐让我觉得生活真的很美好。🐿️',
    timestamp: "2024-12-20T14:30:00Z",
    likes: 12,
    comments: 3,
    isLiked: false,
    tags: ["生活", "日常", "快乐"],
    location: "中山公园",
  },
  {
    id: 2,
    content:
      "刚刚完成了一个challenging的项目，虽然过程很辛苦，但看到最终的成果还是很有成就感的。每一次的努力都是值得的！💪",
    timestamp: "2024-12-19T22:15:00Z",
    likes: 25,
    comments: 8,
    isLiked: true,
    tags: ["工作", "成长", "励志"],
  },
  {
    id: 3,
    content:
      "夜晚的城市灯火总是让人着迷，每一盏灯后面都有一个故事。站在阳台上看着远方，想着明天又是充满可能的一天。✨",
    timestamp: "2024-12-19T20:45:00Z",
    likes: 18,
    comments: 5,
    isLiked: false,
    tags: ["夜景", "思考", "城市"],
    location: "家里阳台",
  },
  {
    id: 4,
    content:
      "周末和朋友们一起去爬山，虽然累得不行，但山顶的风景真的值得！有时候我们需要走出舒适圈，去拥抱更广阔的世界。🏔️",
    timestamp: "2024-12-18T16:20:00Z",
    likes: 31,
    comments: 12,
    isLiked: true,
    tags: ["运动", "友谊", "自然"],
    location: "香山",
  },
  {
    id: 5,
    content:
      "今天尝试了一家新的咖啡店，环境很棒，咖啡也很香。在这里待了一个下午，读了几十页书，感觉时间过得很慢很舒服。☕",
    timestamp: "2024-12-18T11:30:00Z",
    likes: 9,
    comments: 2,
    isLiked: false,
    tags: ["咖啡", "阅读", "放松"],
    location: "蓝瓶咖啡",
  },
  {
    id: 6,
    content:
      "雨后的街道总是特别清新，空气中弥漫着泥土的香味。突然想起小时候最喜欢雨后出去玩水坑，那种纯真的快乐现在想起来还是很温暖。🌧️",
    timestamp: "2024-12-17T18:15:00Z",
    likes: 14,
    comments: 6,
    isLiked: false,
    tags: ["雨天", "回忆", "童年"],
  },
  {
    id: 7,
    content:
      "深夜的代码时光，bug终于被解决了！虽然熬夜不好，但这种突破困难的感觉真的很棒。程序员的快乐就是这么简单。👨‍💻",
    timestamp: "2024-12-17T01:45:00Z",
    likes: 22,
    comments: 7,
    isLiked: true,
    tags: ["编程", "深夜", "成就感"],
  },
  {
    id: 8,
    content:
      "今天的夕阳特别美，橙红色的天空像是上帝打翻了调色盘。停下脚步欣赏这份美好，提醒自己要多留意身边的美景。🌅",
    timestamp: "2024-12-16T19:30:00Z",
    likes: 27,
    comments: 9,
    isLiked: false,
    tags: ["夕阳", "美景", "感悟"],
  },
];

// 获取所有动态
export function getAllMoments(): Moment[] {
  return moments.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

// 根据ID获取动态
export function getMomentById(id: number): Moment | undefined {
  return moments.find((moment) => moment.id === id);
}

// 根据标签获取动态
export function getMomentsByTag(tag: string): Moment[] {
  return moments.filter((moment) => moment.tags?.includes(tag));
}

// 格式化时间显示
export function formatTimestamp(timestamp: string): string {
  const now = new Date();
  const momentTime = new Date(timestamp);
  const diffInSeconds = Math.floor(
    (now.getTime() - momentTime.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return "刚刚";
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}分钟前`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}小时前`;
  } else if (diffInSeconds < 2592000) {
    return `${Math.floor(diffInSeconds / 86400)}天前`;
  } else {
    return momentTime.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
