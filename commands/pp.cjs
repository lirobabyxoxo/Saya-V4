const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'pp',
    aliases: ['pau'],
    description: 'Mostra o tamanho do "instrumento" do usuário',
    
    slashData: new SlashCommandBuilder()
        .setName('pp')
        .setDescription('Mostra o tamanho do "instrumento" do usuário')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para medir')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performMeter('pp', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performMeter('pp', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performMeter(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const size = Math.floor(Math.random() * 31);
        
        let pp = '8';
        for (let i = 0; i < size; i++) {
            pp += '=';
        }
        pp += 'D';
        
        const messages = [
            `O tamanho do pp de **${target.username}** é:\n\n${pp}\n\n**${size}cm**`,
            `**${target.username}** tem ${size}cm:\n\n${pp}`,
            `Medindo o instrumento de **${target.username}**...\n\n${pp}\n\n**${size}cm**`
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const embed = createYakuzaEmbed(
            '🍆 Medidor de PP',
            randomMessage,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando pp:', error);
        
        const errorEmbed = createYakuzaEmbed(
            'Erro',
            'Ocorreu um erro ao executar este comando.',
            colors.error
        );
        
        if (message) {
            await message.reply({ embeds: [errorEmbed] });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}
