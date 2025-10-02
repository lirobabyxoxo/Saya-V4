const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'lixo',
    aliases: ['trash', 'lata'],
    description: 'Coloca a foto do usuário numa lixeira',
    
    slashData: new SlashCommandBuilder()
        .setName('lixo')
        .setDescription('Coloca a foto do usuário numa lixeira')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para jogar no lixo')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performImageManipulation('lixo', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performImageManipulation('lixo', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performImageManipulation(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const avatarUrl = target.displayAvatarURL({ extension: 'png', size: 512 });
        const imageUrl = `https://some-random-api.com/canvas/misc/trash?avatar=${encodeURIComponent(avatarUrl)}`;
        
        const messages = [
            `**${author.username}** jogou **${target.username}** no lixo! 🗑️`,
            `**${target.username}** foi parar na lixeira! 🗑️`,
            `**${author.username}** descartou **${target.username}**! 🗑️`
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const embed = createYakuzaEmbed(
            '🗑️ No Lixo',
            randomMessage,
            colors.primary
        );
        
        embed.setImage(imageUrl);
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando lixo:', error);
        
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
