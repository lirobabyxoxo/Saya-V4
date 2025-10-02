const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'triggered',
    aliases: ['raiva'],
    description: 'Gera gif "triggered" com o avatar da pessoa',
    
    slashData: new SlashCommandBuilder()
        .setName('triggered')
        .setDescription('Gera gif "triggered" com o avatar da pessoa')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para gerar o gif')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performImageManipulation('triggered', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performImageManipulation('triggered', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performImageManipulation(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const avatarUrl = target.displayAvatarURL({ extension: 'png', size: 512 });
        const imageUrl = `https://some-random-api.com/canvas/misc/triggered?avatar=${encodeURIComponent(avatarUrl)}`;
        
        const embed = createYakuzaEmbed(
            '😡 TRIGGERED',
            `**${target.username}** está PISTOLA! 🔥`,
            colors.primary
        );
        
        embed.setImage(imageUrl);
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando triggered:', error);
        
        const errorEmbed = createYakuzaEmbed(
            'Erro',
            'Ocorreu um erro ao gerar a imagem. Tente novamente mais tarde.',
            colors.error
        );
        
        if (message) {
            await message.reply({ embeds: [errorEmbed] });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}
