const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'stonks',
    aliases: ['stonk'],
    description: 'Avatar no meme "stonks"',
    
    slashData: new SlashCommandBuilder()
        .setName('stonks')
        .setDescription('Avatar no meme "stonks"')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para criar o meme')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performImageManipulation('stonks', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performImageManipulation('stonks', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performImageManipulation(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const avatarUrl = target.displayAvatarURL({ extension: 'png', size: 512 });
        const imageUrl = `https://some-random-api.com/canvas/misc/its-so-stupid?avatar=${encodeURIComponent(avatarUrl)}`;
        
        const messages = [
            `**${target.username}** fazendo STONKS! 📈`,
            `**${target.username}** nos negócios! 💹`,
            `**${target.username}** investindo! 💰`
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const embed = createYakuzaEmbed(
            '📈 STONKS',
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
        console.error('Erro no comando stonks:', error);
        
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
