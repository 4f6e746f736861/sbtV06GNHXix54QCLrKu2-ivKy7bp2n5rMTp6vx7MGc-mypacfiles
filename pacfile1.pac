const domains = [
    "cdn.cavernoftime.com" // cdn
    "claudemcpcontent.com", // claude
    "jsdelivr.net", // claude
    "esm.sh", // claude
    "anthropic.com", // claude
    "claude.ai", // claude
    "nnmstatic.win", // nnmclub.to
    "torproject.org", // tor
    "tg.dev", // telegram
    "telesco.pe", // telegram
    "t.me", // telegram
    "telegram.org", // telegram
    "whatsapp.net", // whatsapp
    "whatsapp.com", // whatsapp
    "google.com", // google photo
    "oaistatic.com", // chatgpt
    "kiwix.org", // kiwix
    "sagernet.org", // sing-box docs
    "censorship.no",
    "4pda.to",
    "ttvnw.net", // twich, video stream
    "gql.twitch.tv", // twich, trying to avoid block 1080 quality
    "usher.ttvnw.net", // twich, trying to avoid block 1080 quality
    "4pda.to",
    "cloudfront.net", // CDN Amazon (sometime twitch use it)
    "habr.com",
    "mattermost.com",
    "dis.gd", // Discord
    "discord.co", // Discord
    "discord.com", // Discord
    "discord.design", // Discord
    "discord.dev", // Discord
    "discord.gg", // Discord
    "discord.gift", // Discord
    "discord.gifts", // Discord
    "discord.media", // Discord
    "discord.new", // Discord
    "discord.store", // Discord
    "discord.tools", // Discord
    "discordapp.com", // Discord
    "discordapp.net", // Discord
    "discordmerch.com", // Discord
    "discordpartygames.com", // Discord
    "discord-activities.com", // Discord
    "discordactivities.com", // Discord
    "discordsays.com", // Discord
    "discordcdn.com", // Discord
    "discordstatus.com", // Discord
    "twimg.com", // twitter
    "x.com", // twitter
    "t.co", // twitter
    "twitter.com", // twitter
    "licdn.com", // linkedin
    "linkedin.com", // linkedin
    "ntc.party",
    "oaiusercontent.com", // chatgpt
    "openai.com", // chatgpt
    "chatgpt.com", // chatgpt
    "instagram.com",
    "fbcdn.net", // facebook
    "facebook.com",
    "rutor.info",
    "nnmclub.to",
    "rutracker.cc",
    "rutracker.org",
    "digitalocean.com",
    "meduza.io",
    "medium.com", // medium
    "googleapis.com",
    "youtu.be", // youtube
    "youtube.com", // youtube
    "play.google.com", // youtube
    "googlevideo.com", // youtube
    "yt3.ggpht.com", // youtube
    "ytimg.com", // youtube
];

function IsDomainInArray(host) {
    for (const domain of domains) {
        if (dnsDomainIs(host, domain)) {
            return true
        }
      }
    return false
}

function FindProxyForURL(url, host) { 
    // If the hostname matches, send direct. 
        // if (dnsDomainIs(host, "intranet.domain.com") || 
        //     shExpMatch(host, "(*.abcdomain.com|abcdomain.com)")) 
        // if (dnsDomainIs(host, "meduza.io")) 
        if (IsDomainInArray(host))
            return "PROXY 127.0.0.1:2080"; 
    
    // If the protocol or URL matches, send direct. 
        // if (url.substring(0, 4)=="ftp:" || 
        //     shExpMatch(url, "http://abcdomain.com/folder/*")) 
        if (url.substring(0, 4)=="ftp:") 
            return "DIRECT"; 
    
    // If the requested website is hosted within the internal network, send direct. 
        if (isPlainHostName(host) || 
            // shExpMatch(host, "*.local") || 
            isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") || 
            isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") || 
            isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0") || 
            isInNet(dnsResolve(host), "127.0.0.0", "255.255.255.0")) 
            return "DIRECT"; 
    
    // If the IP address of the local machine is within a defined 
    // subnet, send to a specific proxy. 
        // if (isInNet(myIpAddress(), "10.10.5.0", "255.255.255.0")) 
        //     return "PROXY 1.2.3.4:8080"; 
    
    // DEFAULT RULE: All other traffic, use below proxies, in fail-over order. 
        // return "PROXY 4.5.6.7:8080; PROXY 7.8.9.10:8080"; }
        return "DIRECT"; }
