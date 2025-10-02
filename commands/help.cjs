const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['ajuda', 'comandos'],
    description: 'Mostra todos os comandos disponíveis',

    slashData: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Mostra todos os comandos disponíveis'),

    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        await sendHelpMessage(message.author, message, null, config, colors, createYakuzaEmbed);
    },

    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        await sendHelpMessage(interaction.user, null, interaction, config, colors, createYakuzaEmbed);
    }
};

async function sendHelpMessage(user, message, interaction, config, colors, createYakuzaEmbed) {
    const helpEmbed = createYakuzaEmbed(
        '<:config:1422275041990672428> **Precisando de ajuda?**',
        'Olha só os comandos que eu tenho pra você! 🚀',
        colors.accent
    );

    // Comandos de Administração
    helpEmbed.addFields({
        name: '> <:moderador:1422270592232718466> **Administrativo**',
        value: 
            `**›** \`${config.prefix}ban\` **[@usuário] [motivo]** - Banir usuário\n` +
            `**›** \`${config.prefix}kick\` **[@usuário] [motivo]** - Expulsar usuário\n` +
            `**›** \`${config.prefix}mute\` **[@usuário] [tempo] [motivo]** - Mutar (1s a 28d)\n` +
            `**›** \`${config.prefix}unmute\` **[@usuário]** - Desmutar usuário\n` +
            `**›** \`${config.prefix}unban\` **[ID]** - Desbanir usuário\n` +
            `**›** \`${config.prefix}clear\` **[número]** - Limpar mensagens (1-100)`,
        inline: false
    });

    // Comandos de Roleplay
    helpEmbed.addFields({
        name: '> 💕 **Roleplay**',
        value: 
            `**›** \`${config.prefix}kiss\` **[@usuário]** - Beijar alguém\n` +
            `**›** \`${config.prefix}hug\` **[@usuário]** - Abraçar alguém\n` +
            `**›** \`${config.prefix}kill\` **[@usuário]** - Matar alguém\n` +
            `**›** \`${config.prefix}pat\` **[@usuário]** - Afagar alguém\n` +
            `**›** \`${config.prefix}slap\` **[@usuário]** - Dar um tapa`,
        inline: false
    });

    // Comandos de Diversão
    helpEmbed.addFields({
        name: '> 🎉 **Diversão & Medidores**',
        value: 
            `**›** \`${config.prefix}gay\` **[@usuário]** - % de gay\n` +
            `**›** \`${config.prefix}pp\` **[@usuário]** - Tamanho do "instrumento"\n` +
            `**›** \`${config.prefix}iq\` **[@usuário]** - Medir QI\n` +
            `**›** \`${config.prefix}gado\` **[@usuário]** - Nível de gado\n` +
            `**›** \`${config.prefix}sus\` **[@usuário]** - Quão suspeito\n` +
            `**›** \`${config.prefix}genio\` **[@usuário]** - Quão gênio\n` +
            `**›** \`${config.prefix}corno\` **[@usuário]** - Nível de corno\n` +
            `**›** \`${config.prefix}pal\` **[@usuário]** - Amigos verdadeiros`,
        inline: false
    });

    // Comandos de Jogos
    helpEmbed.addFields({
        name: '> 🎮 **Jogos & Sorte**',
        value: 
            `**›** \`${config.prefix}8ball\` **[pergunta]** - Bola mágica responde\n` +
            `**›** \`${config.prefix}coinflip\` - Cara ou coroa\n` +
            `**›** \`${config.prefix}dado\` **[lados]** - Rolar dado (2-1000)\n` +
            `**›** \`${config.prefix}frase\` - Frase aleatória/motivacional`,
        inline: false
    });

    // Comandos de Imagem
    helpEmbed.addFields({
        name: '> 🖼️ **Manipulação de Imagem**',
        value: 
            `**›** \`${config.prefix}triggered\` **[@usuário]** - Gif triggered\n` +
            `**›** \`${config.prefix}lixo\` **[@usuário]** - Foto na lixeira\n` +
            `**›** \`${config.prefix}stonks\` **[@usuário]** - Meme stonks`,
        inline: false
    });

    // Comandos Utilitários
    helpEmbed.addFields({
        name: '> <:motivo:1422270593759318117> **Utilitários**',
        value: 
            `**›** \`${config.prefix}avatar\` **[@usuário]** - Mostrar avatar\n` +
            `**›** \`${config.prefix}userinfo\` **[@usuário]** - Info do usuário\n` +
            `**›** \`${config.prefix}ping\` - Ping do bot\n` +
            `**›** \`${config.prefix}help\` - Esta mensagem`,
        inline: false
    });

    helpEmbed.addFields({
        name: '> <:info2:1422270589967532155> **Dica**',
        value: `Todos os comandos funcionam com **prefixo** (\`${config.prefix}\`) ou **slash commands** (/)\n**Exemplo:** \`${config.prefix}help\` ou \`/help\``,
        inline: false
    });

    try {
        // Enviar no DM do usuário
        await user.send({ embeds: [helpEmbed] });

        // Resposta confirmando o envio
        const confirmEmbed = createYakuzaEmbed(
            ' :rofl: Sabe nem usar o bot!',
            'Te mandei o tutorial na DM',
            colors.success
        );

        if (message) {
            await message.reply({ embeds: [confirmEmbed] });
        } else if (interaction) {
            await interaction.reply({ embeds: [confirmEmbed], ephemeral: true });
        }

    } catch (error) {
        // Se não conseguir enviar DM
        const errorEmbed = createYakuzaEmbed(
            'Erro',
            'Abre o pv ae pORRA, não consegui te mandar a mensagem.',
            colors.error
        );

        if (message) {
            await message.reply({ embeds: [errorEmbed] });
        } else if (interaction) {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}